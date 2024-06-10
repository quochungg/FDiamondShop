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
            if (isGIA)
            {
                // Handle the GIA picture case
                var giaImage = product.ProductImages.FirstOrDefault(x => x.IsGia);
                if (giaImage != null)
                {
                    giaImage.ImageUrl = productImages.ImageUrl;
                }
                else
                {
                    // If no GIA image exists, add a new one
                    product.ProductImages.Add(new ProductImage
                    {
                        ProductId = product.ProductId,
                        ImageUrl = productImages.ImageUrl,
                        IsGia = true
                    });
                }
            }
            else
            {
                // Handle non-GIA pictures case
                foreach (var image in product.ProductImages.Where(x => !x.IsGia))
                {
                    image.ImageUrl = productImages.ImageUrl;
                }
            }
        }
    }
}
