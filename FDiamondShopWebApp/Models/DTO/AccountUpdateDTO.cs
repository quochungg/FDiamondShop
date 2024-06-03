namespace FDiamondShop.API.Models.DTO
{
    public class AccountUpdateDTO
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string? Password { get; set; }
        public string? NewPassword { get; set; }
        public string? ConfimPassword { get; set; }
    }
}
