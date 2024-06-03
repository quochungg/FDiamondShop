using FDiamondShop.API.Models;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IShoppingCartRepository : IRepository<ShoppingCart>
    {
        Task<ShoppingCart> GetCartByUserIdAsync(string userId);
        Task<ShoppingCart> CreateCartAsync(ShoppingCart cart);
        Task<CartItem> AddItemToCartAsync(int cartId, CartItem cartItem);
        Task<bool> RemoveItemFromCartAsync(int cartItemId);
    }                        
}
