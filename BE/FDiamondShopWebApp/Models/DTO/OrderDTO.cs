namespace FDiamondShop.API.Models.DTO
{
    public class OrderDTO
    {
        public string UserId { get; set; }

        public int? PaymentId { get; set; }

        public decimal BasePrice { get; set; }

        public decimal TotalPrice { get; set; }

        public int? DiscountCodeId { get; set; }

    }
}
