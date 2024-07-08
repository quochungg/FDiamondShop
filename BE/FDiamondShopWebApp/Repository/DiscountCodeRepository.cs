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
            return _db.DiscountCodes.SingleOrDefault (dc=>dc.DiscountCodeName.ToLower() == createDTO.DiscountName.ToLower());
        }
        public List <DiscountCode> GetAllOpen()
        {
            return _db.DiscountCodes.Where(dc=>dc.IsExpried == false).ToList();
        }
        public DiscountCode CheckDuplicate(string code, int id)
        {
            if(id == 0)
            {
                return _db.DiscountCodes.SingleOrDefault(dc => dc.DiscountCodeName.Equals(code));
            }
            return _db.DiscountCodes.SingleOrDefault(dc => dc.DiscountCodeName.Equals(code) && dc.DiscountId != id);


        }
        public async Task<DiscountReturnDTO> ApplyDiscount(ApplyDiscountDTO applyDiscountDTO)
        {
            var discountCode = await _db.DiscountCodes.FirstOrDefaultAsync(x => x.DiscountCodeName == applyDiscountDTO.DiscountCode) ?? throw new Exception("Discount code is invalid");
            if (discountCode.IsExpried)
            {
                throw new Exception("Discount code is expried");
            }
            DiscountReturnDTO returnDTO = new()
            {
                ReduceAmount = applyDiscountDTO.Amount * discountCode.DiscountPercent / 100,
                ReducePercent = discountCode.DiscountPercent
            };
            return returnDTO;

        }
        
    }
}
