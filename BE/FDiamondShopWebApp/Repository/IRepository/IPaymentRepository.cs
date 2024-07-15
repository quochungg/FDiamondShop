using FDiamondShop.API.Models;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IPaymentRepository : IRepository<Payment>
    {
        public Task UpdateStatus(Order order, ApplicationUser user);

    }
}
