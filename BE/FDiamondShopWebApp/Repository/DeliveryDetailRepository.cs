using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using System.Linq.Expressions;

namespace FDiamondShop.API.Repository
{
    public class DeliveryDetailRepository : Repository<DeliveryDetail>, IDeliveryDetailRepository
    {
        private readonly FDiamondContext _db;
        public DeliveryDetailRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }
        public  async Task Update(DeliveryDetail obj)
        {
            _db.DeliveryDetails.Update(obj);
        }
    }
}
