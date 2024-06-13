using FDiamondShop.API.Models;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface ICartRepository : IRepository<CartLine>
    {
        Task CreateCartlineItem(CartLineItem cartLineItem);
        Task RemoveRange(List<CartLineItem> cartLineItems);
        void UpdateCartLineStatus(Order order);
    }
}
