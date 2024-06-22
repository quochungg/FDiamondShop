namespace FDiamondShop.API.Models.DTO
{
    public class OrderCreateDTO
    {
        public string UserName { get; set; }
        public string? DiscountName { get; set; } = null;
        public string? PaymentMethod { get; set; }
    }
}
