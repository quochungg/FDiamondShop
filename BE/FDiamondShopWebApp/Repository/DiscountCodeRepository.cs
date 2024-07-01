using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
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
        public DiscountCode FindinOrder(OrderCreateDTO createDTO)
        {
            return _db.DiscountCodes.SingleOrDefault (dc=>dc.DiscountCodeName == createDTO.DiscountName);
        }
        public DiscountCode CheckDuplicate (DiscountCodeCreateDTO discountCodeCreateDTO)
        {
            return _db.DiscountCodes.SingleOrDefault(dc => dc.DiscountCodeName == discountCodeCreateDTO.DiscountCodeName);
        }
    }
}
