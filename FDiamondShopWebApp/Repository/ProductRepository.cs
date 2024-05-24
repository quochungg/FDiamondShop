using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using FDiamondShopWebApp.Repository;

namespace FDiamondShop.API.Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        FDiamondContext _db;
        public ProductRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }

        public Task<Product> CreateProduct(Product product, List<ProductVariantValue> listValue)
        {
            throw new NotImplementedException();
        }

        public Task<Product> Disable(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Product>> PartialGet(int pageNumber)
        {
            throw new NotImplementedException();
        }

        public Task<Product> UpdateProduct(Product product)
        {
            throw new NotImplementedException();
        }
    }
}
