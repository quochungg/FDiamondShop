using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FDiamondShop.API.Repository
{
    public class DeliveryRepository : Repository<DeliveryDetail>, IDeliveryRepository
    {
        private readonly FDiamondContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public DeliveryRepository(FDiamondContext db, UserManager<ApplicationUser> userManager) : base(db)
        {
            _db = db;
            _userManager = userManager;
        }
        public async Task<List<UserDTO>> GetDeliveryStaff()
        {
            var users = _userManager.Users.ToList();
            List<UserDTO> userDTOs = new List<UserDTO>();
            
            
            foreach (var user in users)
            {
                UserDTO userDTO = new UserDTO
                {
                    UserName = user.UserName,
                    Address = user.Address,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    PhoneNumber = user.PhoneNumber,
                    IsGoogleAccount = (user.PasswordHash == null),
                    Role = _userManager.GetRolesAsync(user).Result.FirstOrDefault()
                };
                if(userDTO.Role == "deliverystaff")// tam thoi em de admin
                {
                    userDTOs.Add(userDTO);
                }
            }
            return userDTOs;
           
        }
        public async Task<List<OrderDTO>> GetAllOrderForDelivery(string id)
        {
            var order=_db.Orders.Include(o => o.DeliveryDetail).Where(x=>x.DeliveryDetail.UserId==id).ToList();
            List<OrderDTO> orderDTOs = new List<OrderDTO>();
            foreach (var item in order)
            {
                OrderDTO orderDTO = new OrderDTO
                {
                    OrderId = item.OrderId,
                    BasePrice = item.BasePrice,
                    DeliveryDetailId = item.DeliveryDetailId,                    
                    TotalPrice = item.TotalPrice,
                    OrderDate = item.OrderDate,
                    Status = item.Status,
                    
                };
                if (orderDTO.Status == "Completed")
                {
                    orderDTOs.Add(orderDTO);
                }
                
            }
            return orderDTOs;
        } 
        public async Task UpdateOrderStatus(OrderStatusDTO model)
        {
            var order = _db.Orders.FirstOrDefault(x => x.OrderId == model.OrderId);
            order.Status = model.Status;
            _db.Orders.Update(order);
            
        }

    }
}
