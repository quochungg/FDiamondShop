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

        public void UpdateProductImageAsync(Product product, ProductImageUpdateDTO productImages, bool isGIA = false)
        {           
            foreach (var item in product.ProductImages)
            {
                var existedImage = product.ProductImages.FirstOrDefault(x => x.ProductId == item.ProductId && x.IsGia == isGIA);
                if(existedImage != null) { 
                    existedImage.ImageUrl = productImages.ImageUrl;
                    return;
                }
            }
            return;
        }
    }
}
