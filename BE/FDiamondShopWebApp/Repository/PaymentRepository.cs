using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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
        public async Task UpdateStatus(Order order, ApplicationUser user)
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
                    Product product = await _db.Products.Where(product => product.ProductId == item.ProductId).FirstOrDefaultAsync();
                    if (product.Quantity == 0)
                    {
                        throw new Exception("Product is out of stock: " + product.ProductName);
                    }
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
