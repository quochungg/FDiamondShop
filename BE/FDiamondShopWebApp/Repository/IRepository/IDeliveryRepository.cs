using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IDeliveryRepository : IRepository<DeliveryDetail>
    {
        public Task<List<UserDTO>> GetDeliveryStaff();
        public Task<List<UserDTO>> GetOrdermanagementStaff();
        public DeliveryDetail GetDeliveryDetailbyId(int? id);
        public Task UpdateOrderStatus(Order model);
        public Task UpdateDetail(DeliveryDetail obj);

    }
}
