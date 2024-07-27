using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task RemoveOrderAsync(Order order);
        Task UpdateOrderAsync(Order order);
        public Task<List<OrderDTO>> GetAllOrderAsync(string userId);
        public Task<OrderDTO> GetOrderDetails(int orderId);
        public Task CancelOrder(int orderId);
        public Task<List<OrderDTO>> FilterOrder (string userId, string status, string orderBy);

        public Task CompleteOrder (int orderId);
        public Task RollBackOrder(int orderId);
        public Task RePurchase(int orderId);
        Task<IEnumerable<Order>> GetPendingOrdersOlderThan(DateTime cutoffTime);
        Task UpdateAsync(Order order);
        public Order GetOrderbyId(int id);
        public Task<List<OrderDTO>> GetAllOrderForOrderManagement(string id);
        public Task<List<OrderDTO>> GetAllOrderForDelivery(string id);



    }
}
