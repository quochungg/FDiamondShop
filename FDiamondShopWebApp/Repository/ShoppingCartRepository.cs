using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using System.Linq.Expressions;

namespace FDiamondShop.API.Repository
{
    public class ShoppingCartRepository : Repository<ShoppingCart>, IShoppingCartRepository
    {
        private readonly FDiamondContext _db;
        public ShoppingCartRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }

        public async Task<CartItem> AddItemToCartAsync(int cartId, CartItem cartItem)
        {
            cartItem.CartId = cartId;
            _db.ShoppingCartItems.Add(cartItem);
            return cartItem;
        }

        public async Task<ShoppingCart> CreateCartAsync(ShoppingCart cart)
        {
            _db.ShoppingCarts.Add(cart);
            return cart;   
        }

        public Task<ShoppingCart> GetCartByUserIdAsync(string userId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> RemoveItemFromCartAsync(int cartItemId)
        {
            throw new NotImplementedException();
        }
    }
}
