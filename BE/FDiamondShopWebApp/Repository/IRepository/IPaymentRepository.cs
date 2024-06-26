using FDiamondShop.API.Models;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IPaymentRepository : IRepository<Payment>
    {
        public void UpdateStatus(Order order, Payment model, ApplicationUser user);

    }
}
