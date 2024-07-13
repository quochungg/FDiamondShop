using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IDiscountRepository: IRepository <DiscountCode>
    {
        public DiscountCode FindinOrder(OrderCreateDTO createDTO);
        public DiscountCode CheckDuplicate(string code, int id);
        public List<DiscountCode> GetAllOpen();
        public  Task<DiscountReturnDTO> ApplyDiscount(ApplyDiscountDTO applyDiscountDTO);
    }
}
