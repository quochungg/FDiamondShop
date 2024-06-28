using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

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
              _db.CartLineItems.Add(cartLineItem);
            
        }

        public async Task RemoveRange(List<CartLineItem> cartLineItems)
        {
            _db.RemoveRange(cartLineItems);
        }
        public async Task<List<CartLine>> GetAllCartlineExist(ApplicationUser user)
        {
           var cartlineList= await _db.CartLines.Include(cl => cl.CartLineItems)
                .Where(cl => cl.UserId == user.Id && cl.IsOrdered == false)
                .ToListAsync();
            return cartlineList;
        }
       public async Task<CartLine> FindCartlineId(int cartLineId)
        {
            var cartline =  await _db.CartLines.FindAsync(cartLineId);
            return cartline;
        }
        public async Task<List<CartLineItem>> GetCartLineItems(int cartLineId)
        {
            var cartLineItems = await _db.CartLineItems
                .Where(cli => cli.CartLineId == cartLineId).ToListAsync();
            return cartLineItems;
        }
    }
}
