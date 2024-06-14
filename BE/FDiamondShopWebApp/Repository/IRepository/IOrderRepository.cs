using FDiamondShop.API.Models;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task RemoveOrderAsync(Order order);
        Task UpdateOrderAsync(Order order);
    }
}
