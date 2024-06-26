using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Identity;

namespace FDiamondShop.API.Repository
{
    public class PaymentRepository : Repository<Payment>, IPaymentRepository
    {
        private readonly FDiamondContext _db;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<ApplicationUser> _userManager;

        public PaymentRepository(FDiamondContext db) : base(db)
        {
            _db = db;
        }
        public void UpdateStatus(Order order,Payment model,ApplicationUser user)
        {
            
            var cartLineupdate = _db.CartLines.Where(cartLineupdate => cartLineupdate.UserId.Equals(user.Id)
            && cartLineupdate.IsOrdered == false).ToList();
            foreach (var line in cartLineupdate)
            {
                line.OrderId = order.OrderId;
                line.IsOrdered = true;
                var cartlineItems = _db.CartLineItems.Where(cartlineItems => cartlineItems.CartLineId == line.CartLineId).ToList();
                foreach (var item in cartlineItems)
                {
                    var product = _db.Products.Where(product => product.ProductId == item.ProductId).FirstOrDefault();
                    product.Quantity--;
                    if (product.Quantity == 0)
                    {
                        product.IsVisible = false;
                    }
                }
            }
        }

    }
}
