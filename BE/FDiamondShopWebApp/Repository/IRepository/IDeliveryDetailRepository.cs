using FDiamondShop.API.Models;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IDeliveryDetailRepository : IRepository<DeliveryDetail>
    {
        public Task Update(DeliveryDetail obj);
    }
}
