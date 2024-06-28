namespace FDiamondShop.API.Models.DTO
{
    public class LoginResponseDTO
    {
        public string UserId { get; set; }
        public UserDTO User { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
    }
}
