using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace FDiamondShop.API.Repository
{
    public class DiscountCodeRepository : Repository<DiscountCode>, IDiscountRepository
    {
        private readonly FDiamondContext _db;
        public DiscountCodeRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }
        public async Task<List<DiscountCode>> GetExpiredDiscounts(DateTime currentDate)
        {
            return await _db.DiscountCodes
                .Where(d => d.EndDate <= currentDate && !d.IsExpried)
                .ToListAsync();
        }
    }
}
