using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;

namespace FDiamondShop.API.Repository
{
    public class ProductImageRepository : Repository<ProductImage>, IProductImageRepository
    {
        private readonly FDiamondContext _db;
        public ProductImageRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }
    }
}
