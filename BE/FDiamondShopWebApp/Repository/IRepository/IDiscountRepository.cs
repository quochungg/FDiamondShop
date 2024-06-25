using FDiamondShop.API.Models;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IDiscountRepository: IRepository <DiscountCode>
    {
        public  Task<List<DiscountCode>> GetExpiredDiscounts(DateTime currentDate);
    }
}
