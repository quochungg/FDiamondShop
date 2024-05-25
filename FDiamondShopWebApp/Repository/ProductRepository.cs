using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using FDiamondShop.API.Repository;
using FDiamondShop.API.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace FDiamondShop.API.Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly FDiamondContext _db;
        public ProductRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _db.Products
                .Include(p => p.SubCategory).Include(p => p.ProductVariantValues).Include(p => p.ProductImages) // Include the SubCategory navigation property
                .ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _db.Products.Include(p => p.ProductVariantValues).Include(p => p.ProductImages)
                .FirstOrDefaultAsync(u => u.ProductId == id);
        }

        public Task<Product> CreateProduct(Product product, List<ProductVariantValue> listValue)
        {
            throw new NotImplementedException();
        }

        public Task<Product> CreateProduct(ProductCreateDTO product)
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
