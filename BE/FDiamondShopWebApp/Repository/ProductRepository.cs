using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using FDiamondShop.API.Repository;
using FDiamondShop.API.Models.DTO;
using Microsoft.EntityFrameworkCore;
using FDiamondShop.API.Controllers;

namespace FDiamondShop.API.Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly FDiamondContext _db;
        public ProductRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }

        public async Task<List<Product>> GetRecommendProducts(int productId)
        {
            var product = await _db.Products.FirstOrDefaultAsync(p => p.ProductId == productId);
            var recommendProducts = await _db.Products.Where(p => p.SubCategoryId == product.SubCategoryId && p.ProductId != productId && p.IsVisible == true).Include(p => p.ProductImages).ToListAsync();
            foreach (var products in recommendProducts)
            {
                products.ProductImages = products.ProductImages.Where(u => u.ImageUrl.Contains("https://ion.bluenile.com") || u.ImageUrl.Contains("stage_0") || u.ImageUrl.Contains("firebase")).Take(1).ToList();
                if (product.ProductImages.Count == 0)
                {
                    var productImage = new ProductImage
                    {
                        ImageUrl = "https://img.freepik.com/premium-photo/close-up-elegant-diamond-interior-white-space-product-display-exhibition-concept-choosing-best-diamond-gem-design-3d-render_167862-5942.jpg"
                    };
                    product.ProductImages.Add(productImage);
                }
            }
            return recommendProducts;
        }

        public async Task<IEnumerable<Product>> SearchProductByName(string searchValue)
        {
            var returnList = await _db.Products.Include(p => p.ProductImages).
                Include(p => p.ProductVariantValues).
                ThenInclude(pv => pv.Variant).
                Include(p => p.SubCategory).
                ThenInclude(o => o.Category).
                Include(p => p.ProductImages).
                Where(p => p.ProductName.ToLower().Contains(searchValue.ToLower()) && p.IsVisible == true && p.IsDeleted == false).
                ToListAsync();

            foreach (var product in returnList)
            {
                product.ProductImages = product.ProductImages.Where(u => u.ImageUrl.Contains("https://ion.bluenile.com") || u.ImageUrl.Contains("stage_0") || u.ImageUrl.Contains("firebase")).Take(1).ToList();
                if (product.ProductImages.Count == 0)
                {
                    var productImage = new ProductImage
                    {
                        ImageUrl = "https://img.freepik.com/premium-photo/close-up-elegant-diamond-interior-white-space-product-display-exhibition-concept-choosing-best-diamond-gem-design-3d-render_167862-5942.jpg"
                    };
                    product.ProductImages.Add(productImage);
                }
            }
            return returnList;
        }

        public async Task<Product> UpdateProduct(ProductUpdateDTO dto)
        {
            var product = await _db.Products.Include(p => p.ProductVariantValues).Include(p => p.ProductImages).FirstOrDefaultAsync(u => u.ProductId == dto.ProductId) ?? throw new Exception("Product Not Found!");
            return product ?? new Product();
        }

        public async Task<Product> GetProductForUpdateAsync(int productId)
        {
            return await _db.Products
        .FromSqlRaw("SELECT * FROM Products WITH (UPDLOCK) WHERE product_id = {0}", productId)
        .FirstOrDefaultAsync();
        }

        public Product Update(Product entity)
        {
            var product = _db.Products.Update(entity);
            return product.Entity;
        }
    }

}

