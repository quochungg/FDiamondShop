namespace FDiamondShop.API.Models.DTO
{
    public class LoginResponseDTO
    {
        public Account User { get; set; }
        public string Token { get; set; }
    }
}
