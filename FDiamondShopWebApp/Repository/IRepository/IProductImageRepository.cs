using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IProductImageRepository : IRepository<ProductImage>
    {
        void UpdateProductImageAsync(Product product, ProductImageUpdateDTO productImages, bool isGIA = false);

    }
}
