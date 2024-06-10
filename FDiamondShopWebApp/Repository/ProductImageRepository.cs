using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace FDiamondShop.API.Repository
{
    public class ProductImageRepository : Repository<ProductImage>, IProductImageRepository
    {
        private readonly FDiamondContext _db;

        public ProductImageRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }

        public async void UpdateProductImageAsync(Product product, List<ProductImage> productUpdate)
        {
            var existingProductImages = _db.ProductImages.Where(x => x.ProductId == product.ProductId).ToList();
            if (existingProductImages.Count > 0)
            {
                _db.ProductImages.RemoveRange(existingProductImages);
            }
            product.ProductImages = productUpdate;

        }
    }
}
