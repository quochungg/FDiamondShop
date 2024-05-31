using System.ComponentModel.DataAnnotations;

namespace FDiamondShop.API.Models.DTO
{
    public class RegistrationEmployeeDTO
    {
        [Required]
        public string Email { get; set; } = null!;
        [Required]
        public string FirstName { get; set; } = null!;
        [Required]
        public string LastName { get; set; } = null!;       
        [Required]
        public string Role { get; set; } = null!;
    }
}
