using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;

namespace FDiamondShop.API.Repository
{
    public class OrderRepository : Repository<Order>, IOderRepository
    {
        private readonly FDiamondContext _db;

        public OrderRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }
    }
}
