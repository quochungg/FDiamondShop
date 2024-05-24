using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShopWebApp.Repository;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IProductRepository : IRepository<Product>
    {

        Task<Product> CreateProduct(Product product, List<ProductVariantValue> listValue);
        Task<Product> UpdateProduct(Product product);
        Task<Product> Disable(int id);
        
    }
}
