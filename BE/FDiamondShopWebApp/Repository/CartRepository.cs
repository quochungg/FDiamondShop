using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Bcpg;
using Org.BouncyCastle.Utilities;
using System.Linq;

namespace FDiamondShop.API.Repository
{
    public class CartRepository : Repository<CartLine>, ICartRepository
    {
        private readonly FDiamondContext _db;
        private readonly IMapper _mapper;
        public CartRepository(FDiamondContext db, IMapper mapper) : base(db)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task CreateCartlineItem(CartLineItem cartLineItem)
        {
            await _db.CartLineItems.AddAsync(cartLineItem);

        }

        public async Task RemoveRange(List<CartLineItem> cartLineItems)
        {
            _db.RemoveRange(cartLineItems);
        }
        public async Task<List<CartLine>> GetAllCartlineExist(ApplicationUser user)
        {
            var cartlineList = await _db.CartLines.Include(cl => cl.CartLineItems).ThenInclude(cli => cli.Product)
                 .Where(cl => cl.UserId == user.Id && cl.IsOrdered == false)
                 .ToListAsync();
            return cartlineList;
        }
        public async Task<CartLine> FindCartlineId(int cartLineId)
        {
            var cartline = await _db.CartLines.FindAsync(cartLineId);
            return cartline;
        }
        public async Task<List<CartLineItem>> GetCartLineItems(int cartLineId)
        {
            var cartLineItems = await _db.CartLineItems
                .Where(cli => cli.CartLineId == cartLineId).ToListAsync();
            return cartLineItems;
        }

        public async Task<ValidCartLineDTO> ValidCartLine(string userId)
        {
            var user = await _db.Users.FindAsync(userId) ?? throw new Exception("User not found");

            var cartlines = _db.CartLines.Include(cl => cl.CartLineItems).ThenInclude(cli => cli.Product).ThenInclude(p => p.SubCategory).ThenInclude(sc => sc.Category)
                .Where(cl => cl.UserId == userId && cl.IsOrdered == false);

            if (!cartlines.Any())
            {
                throw new Exception("Cartline not found");
            }

            ValidCartLineDTO validCartLineDTO = new();
            Dictionary<int, int> idList = new Dictionary<int, int>();
            Dictionary<int, int> productStock = new Dictionary<int, int>();
            foreach (var cartline in cartlines)
            {
                foreach (var cartItem in cartline.CartLineItems)
                {
                    if (!productStock.ContainsKey(cartItem.ProductId))
                    {
                        productStock.Add(cartItem.ProductId, 1);
                    }
                    else
                    {
                        productStock[cartItem.ProductId] += 1;
                    }
                    //invisible product
                    if (cartItem.Product.Quantity == 0 || !cartItem.Product.IsVisible)
                    {
                        validCartLineDTO.IsValid = false;
                        if (!validCartLineDTO.InvisibleCartLine.Contains(cartline.CartLineId))
                        {
                            validCartLineDTO.InvisibleCartLine.Add(cartItem.CartLineId);
                        }
                    }
                    //duplicate product
                    if (!cartItem.Product.SubCategory.Category.CategoryName.Equals("Diamond"))
                    {
                        continue;
                    }
                    if (!idList.ContainsKey(cartItem.ProductId))
                    {
                        idList.Add(cartItem.Product.ProductId, 1);
                    }
                    else
                    {
                        idList[cartItem.Product.ProductId] += 1;
                    }
                    ////out of stock product
                    //var product = await _db.Products.FindAsync(cartItem.ProductId);

                    //var productInCartQuantity = cartline.CartLineItems.Count(cli => cli.ProductId == cartItem.ProductId);
                    //{
                    //    validCartLineDTO.IsValid = false;

                    //        var outOfStock = new OutOfStockProductDTO()
                    //        {
                    //            ProductId = cartItem.ProductId,
                    //            ProductName = cartItem.Product.ProductName,
                    //            CurrentQuantity = product.Quantity
                    //        };
                    //        validCartLineDTO.OutOfStockCartLine.Add(outOfStock);

                    //}
                }
            }
            List<int> cartLineDuplicate = new List<int>();
            foreach (var pair in idList)
            {
                if (pair.Value > 1)
                {
                    validCartLineDTO.IsValid = false;

                    cartLineDuplicate.AddRange(_db.CartLines.Include(cl => cl.CartLineItems)
                        .Where(cl => cl.UserId == userId && cl.IsOrdered == false && cl.CartLineItems.Any(cli => cli.ProductId == pair.Key))
                        .Select(cl => cl.CartLineId).ToList());
                }
            }

            validCartLineDTO.DuplicateCartLine = cartLineDuplicate;

            foreach (var carline in cartlines)
            {
                foreach (var cartItem in carline.CartLineItems)
                {
                    if (productStock[cartItem.ProductId] > cartItem.Product.Quantity)
                    {
                        validCartLineDTO.IsValid = false;
                        var outOfStock = new OutOfStockProductDTO()
                        {
                            ProductId = cartItem.ProductId,
                            ProductName = cartItem.Product.ProductName,
                            CurrentQuantity = cartItem.Product.Quantity,
                            CartLineId = cartItem.CartLineId
                        };
                        validCartLineDTO.OutOfStockCartLines.Add(outOfStock);
                    }
                }            
            }
            return validCartLineDTO;
        }
        public async Task UpdateRingSize(CartUpdateDTO updateDTO)
        {
            var cartLineItem = await _db.CartLineItems.FirstOrDefaultAsync(cli => cli.CartLineId.Equals(updateDTO.CartLineId) && cli.ProductId == updateDTO.ProductId);
            if (cartLineItem == null)
            {
                throw new Exception("Item not found");
            }
            cartLineItem.RingSize = updateDTO.RingSize;
        }

        public async Task<Boolean> CheckCompletedRing(CreateCartDTO dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.UserName == dto.UserName) ?? throw new Exception("User not found");

            var cartlines = await _db.CartLines.Include(cl => cl.CartLineItems).ThenInclude(cli => cli.Product)
                .Where(cl => cl.UserId == user.Id && cl.IsOrdered == false ).ToListAsync();
            Boolean result = false;
            foreach (var cartline in cartlines)
            {
                var cartLineItemDTO = _mapper.Map<List<CartLineItemCreateDTO>>(cartline.CartLineItems);
                var cartLineItem = dto.CartLineItems.OrderBy(u => u.ProductId).ToList();
                if (cartLineItemDTO[0].ProductId == cartLineItem[0].ProductId && cartLineItemDTO[1].ProductId == cartLineItem[1].ProductId)
                {
                    result = true;
                    break;
                }
            }         
            return result;
        }

        public async Task<List<CartLine>> GetAllCartLineByUserId(string userId)
        {
            var cartlineList = await _db.CartLines.Include(cl => cl.CartLineItems).ThenInclude(cli => cli.Product)
                 .Where(cl => cl.UserId == userId && cl.IsOrdered == false)
                 .ToListAsync();

            foreach (var cartline in cartlineList)
            {
                foreach(var cartLineItem in cartline.CartLineItems)
                {
                    var imageList = await _db.ProductImages.Where(p => p.IsGia == false && p.ImageUrl.Contains("bluenile") && p.ProductId == cartLineItem.Product.ProductId).ToListAsync();
                    ICollection<ProductImage> images = new List<ProductImage>();
                    images.Add(imageList.FirstOrDefault(p => p.ImageUrl.Contains("stage_0")));

                    cartLineItem.Product.ProductImages = images;
                }
            }
            return cartlineList;
        }


    }
}
