using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;

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
        public async void UpdateCartLineStatus(Order order)
        {
            var existingLine = _db.CartLines.Where(x => x.OrderId == order.Id).ToList();
            if (existingLine.Count > 0)
            {
                _db.CartLines.RemoveRange(existingLine);
            }

        }
    }
}
