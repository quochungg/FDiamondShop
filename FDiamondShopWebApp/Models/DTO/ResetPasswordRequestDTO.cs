using System.ComponentModel.DataAnnotations;

namespace FDiamondShop.API.Models.DTO
{
    public class ResetPasswordRequestDTO
    {
        public string Token { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match!")]
        public string ConfirmPassword { get; set; } = null!;
    }
}
