namespace FDiamondShop.API.Models.DTO
{
    public class UserDTO
    {

        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsGoogleAccount { get; set; } = false;       
        public string Role { get; set; }
    }
}
