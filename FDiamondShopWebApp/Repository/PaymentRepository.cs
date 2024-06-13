using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;

namespace FDiamondShop.API.Repository
{
    public class PaymentRepository : Repository<Payment>, IPaymentRepository
    {
        private readonly FDiamondContext _db;
        public PaymentRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }
    }
}
