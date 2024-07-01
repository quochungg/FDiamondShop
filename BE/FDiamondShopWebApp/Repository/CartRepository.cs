using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Bcpg;
using Org.BouncyCastle.Utilities;

namespace FDiamondShop.API.Repository
{
    public class CartRepository : Repository<CartLine>, ICartRepository
    {
        private readonly FDiamondContext _db;
        public CartRepository(FDiamondContext db) : base(db)
        {
            _db = db;
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
            var cartlineList = await _db.CartLines.Include(cl => cl.CartLineItems)
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

            var cartlines = _db.CartLines.Include(cl => cl.CartLineItems).ThenInclude(cli => cli.Product)
                .Where(cl => cl.UserId == userId && cl.IsOrdered == false);

            if (!cartlines.Any())
            {
                throw new Exception("Cartline not found");
            }

            ValidCartLineDTO validCartLineDTO = new();
            List<int> idList = new List<int>();

            foreach (var cartline in cartlines)
            {
                foreach (var cartItem in cartline.CartLineItems)
                {
                    if (idList.Contains(cartItem.Product.ProductId))
                    {
                        validCartLineDTO.IsValid = false;
                        validCartLineDTO.DuplicateCartLine.Add(cartline.CartLineId);
                    }
                    else
                    {
                        idList.Add(cartItem.Product.ProductId);
                    }

                    if (cartItem.Product.Quantity == 0 || !cartItem.Product.IsVisible)
                    {
                        validCartLineDTO.IsValid = false;
                        validCartLineDTO.InvisibleCartLine.Add(cartItem.CartLineId);
                    }
                }
            }

            return validCartLineDTO;
        }
    }
}
