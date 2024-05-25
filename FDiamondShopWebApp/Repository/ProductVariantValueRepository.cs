using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;

namespace FDiamondShop.API.Repository
{
    public class ProductVariantValueRepository : Repository<ProductVariantValue>,IProductVariantValueRepository
    {
        private readonly FDiamondContext _db;
        public ProductVariantValueRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }
    }
}
