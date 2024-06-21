using FDiamondShop.API.Data;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Bcpg;
using PayPalCheckoutSdk.Orders;

namespace FDiamondShop.API.Repository
{
    public class DashboardRepository:IDashboardRepository
    {
        private readonly FDiamondContext _db;
        public DashboardRepository(FDiamondContext db)
        {
            _db = db;
        }
        public async Task<Dictionary<string, int>> CountOrderOfUserAsync()
        {
            var orderCount = await _db.Orders.GroupBy(o => o.UserId).Select(g => new
            {
                UserId = g.Key,
                OrderCount = g.Count()
            }).Join(_db.Users,o => o.UserId
            ,u=>u.Id,(o,u)=>new
            {
                u.UserName,
                o.OrderCount,
            }).ToDictionaryAsync(x=>x.UserName,x=>x.OrderCount);
            return orderCount;
        }
        public async Task<Dictionary<string,int>> CountPaymentMethodAsync()
        {
            var countPayment = await _db.Payments.GroupBy(p => p.PaymentMethod).Select(g => new
            {
                PaymentMethod = g.Key,  
                PaymentCount = g.Count()
            }).ToDictionaryAsync(x=>x.PaymentMethod,x=>x.PaymentCount);
            return countPayment;
        }
        public async Task<Dictionary<string,int>> CountUserinRoleAsync()
        {
            var userRoleCount = await _db.UserRoles.Join(_db.Users,
                ur=>ur.UserId,
                u=>u.Id,
                (ur,u) => ur).Join(_db.Roles, 
                ur=>ur.RoleId,
                r=>r.Id,(ur,r) => new { r.Name }).GroupBy(x => x.Name).Select(g => new
                {
                    RoleName = g.Key,
                    UserCount = g.Count()
                }).ToDictionaryAsync(g=>g.RoleName,g=>g.UserCount);
            return userRoleCount;
        }
    }
}
