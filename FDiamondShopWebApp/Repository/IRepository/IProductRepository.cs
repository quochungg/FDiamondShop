using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product> CreateProduct(ProductCreateDTO product);
        Task<Product> UpdateProduct(Product product);
        Task<Product> Disable(int id);
        
    }
}
