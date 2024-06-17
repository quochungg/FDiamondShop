using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;

namespace FDiamondShop.API.Repository
{
    public class SubCategoryRepository : Repository<SubCategory>, ISubCategoryRepository
    {
        private readonly FDiamondContext _db;
        public SubCategoryRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }
    }
}
