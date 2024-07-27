namespace FDiamondShop.API.Models.DTO
{
    public class OrderCreateDTO
    {
        public string UserName { get; set; }
        public string? DiscountName { get; set; } = null;
        public string? PaymentMethod { get; set; }
        public string Status { get; } = "Pending";
        public string Address { get; set; }
        public string Phone { get; set; }
        public string? Note { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
    }
}
