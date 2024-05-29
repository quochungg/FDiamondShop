using System.ComponentModel.DataAnnotations;

namespace FDiamondShop.API.Models.DTO
{
    public class RegistrationRequestDTO
    {
        public string Email { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string PasswordHash { get; set; } =null!;      
        public string ConfirmPassWord { get; set; } =null!;
    }
}
