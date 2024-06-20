using FDiamondShop.API.Data;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace FDiamondShop.API.Repository
{
    public class DashboardRepository:IDashboardRepository
    {
        private readonly FDiamondContext _db;
        public DashboardRepository(FDiamondContext db)
        {
            _db = db;
        }
        public async Task <Dictionary<string,int>> CountOrderOfUserAsync()
        {
            return await _db.Orders.Include(o => o.User).ToDictionaryAsync(o=>o.UserId,o=>o.User.Id.Count());
        }
    }
}
