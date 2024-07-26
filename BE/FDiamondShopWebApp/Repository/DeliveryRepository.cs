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

        public async Task<List<UserDTO>> GetOrdermanagementStaff()
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
                if (userDTO.Role == "ordermanagementstaff")// tam thoi em de admin
                {
                    userDTOs.Add(userDTO);
                }
            }
            return userDTOs;

        }
        public DeliveryDetail GetDeliveryDetailbyId(int? id)
        {
            return _db.DeliveryDetails.FirstOrDefault(dl => dl.DeliveryDetailId == id);
        }

    }
}
