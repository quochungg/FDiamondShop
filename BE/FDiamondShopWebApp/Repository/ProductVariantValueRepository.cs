using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;

namespace FDiamondShop.API.Repository
{
    public class ProductVariantValueRepository : Repository<ProductVariantValue>, IProductVariantValueRepository
    {
        private readonly FDiamondContext _db;
        public ProductVariantValueRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }

        public void UpdateVariantValue(Product product, ProductVariantValueUpdateDTO productVariantValue)
        {

            var existedVariantValue = product.ProductVariantValues.FirstOrDefault(x => x.VariantId == productVariantValue.VariantId);
            if (existedVariantValue != null)
            {
                existedVariantValue.Value = productVariantValue.Value;
                return;
            }

        }

    }
}
