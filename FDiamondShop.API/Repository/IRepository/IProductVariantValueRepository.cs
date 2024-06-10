using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IProductVariantValueRepository : IRepository<ProductVariantValue>
    {
        void UpdateVariantValue(Product product, ProductVariantValueUpdateDTO productVariantValue);
    }
}
