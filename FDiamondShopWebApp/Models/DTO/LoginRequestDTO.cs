using System.ComponentModel.DataAnnotations;

namespace FDiamondShop.API.Models.DTO
{
    public class LoginRequestDTO
    {     
        public string Email { get; set; } = null!;      
        public string? PasswordHash { get; set; }             
    }
}
