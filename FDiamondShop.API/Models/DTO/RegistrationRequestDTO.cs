using System.ComponentModel.DataAnnotations;

namespace FDiamondShop.API.Models.DTO
{
    public class RegistrationRequestDTO
    {      
        [Required]
        public string UserName { get; set; }
        [Required]
        [RegularExpression(pattern: @"^[a-zA-Z\s]*$", ErrorMessage = "Only characters")]
        public string FirstName { get; set; }
        [Required]
        [RegularExpression(pattern: @"^[a-zA-Z\s]*$", ErrorMessage = "Only characters")]
        public string LastName { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string Password { get; set; }
        public string Role { get; set; }
        [Required]
        [RegularExpression(pattern: @"^0\d{9}$", ErrorMessage = "Only 10 digits and start with 0")]
        public string PhoneNumber { get; set; }
    }
}
