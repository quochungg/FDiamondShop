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
        Task<List<Product>> SearchProductByName(string searchValue);
    }
}
