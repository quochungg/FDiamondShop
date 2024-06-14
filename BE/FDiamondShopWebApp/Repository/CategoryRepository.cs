using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;

namespace FDiamondShop.API.Repository
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        private readonly FDiamondContext _db;
        public CategoryRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }
    }
}
