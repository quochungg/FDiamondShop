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
                .Include(p => p.SubCategory).Include(p => p.ProductVariantValues).Include(p => p.ProductImages) 
                .ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            var product = await _db.Products.Include(p => p.ProductVariantValues).Include(p => p.ProductImages)
                .FirstOrDefaultAsync(u => u.ProductId == id);
            return product ?? new Product();
        }

        public async Task<Product> UpdateProduct(ProductUpdateDTO dto)
        {
            var product = await _db.Products.Include(p => p.ProductVariantValues).Include(p => p.ProductImages).FirstOrDefaultAsync(u => u.ProductId == dto.ProductId) ?? throw new Exception("Product Not Found!");
            return product ?? new Product();
        }
    }
}
