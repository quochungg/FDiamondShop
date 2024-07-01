using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IDiscountRepository: IRepository <DiscountCode>
    {
        public DiscountCode FindinOrder(OrderCreateDTO createDTO);
        public DiscountCode CheckDuplicate(DiscountCodeCreateDTO discountCodeCreateDTO);
    }
}
