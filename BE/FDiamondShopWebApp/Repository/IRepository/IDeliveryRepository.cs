using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IDeliveryRepository : IRepository<DeliveryDetail>
    {
        public Task<List<UserDTO>> GetDeliveryStaff();
        public Task<List<OrderDTO>> GetAllOrderForDelivery(string id);
        public Task UpdateOrderStatus(OrderStatusDTO model);
    }
}
