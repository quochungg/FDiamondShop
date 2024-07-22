using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<Product> UpdateProduct(ProductUpdateDTO dto);
        Task<List<Product>> GetRecommendProducts(int productId);
        Task<IEnumerable<Product>> SearchProductByName(string searchValue);
        Task<Product> GetProductForUpdateAsync(int productId);
        Product Update(Product entity);
    }
}
