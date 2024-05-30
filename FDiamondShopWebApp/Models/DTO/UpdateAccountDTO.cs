namespace FDiamondShop.API.Models.DTO
{
    public class UpdateAccountDTO
    {
        public int AccountId { get; set; }
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;
        public string? Password { get; set; }
        public string? NewPassword { get; set; }
        public string? ConfimPassword { get; set; }
    }
}
