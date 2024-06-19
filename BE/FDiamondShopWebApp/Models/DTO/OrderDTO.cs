namespace FDiamondShop.API.Models.DTO
{
    public class OrderDTO
    {
        

        public int? PaymentId { get; set; }

        public decimal BasePrice { get; set; }

        public decimal TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }

        public int? DiscountCodeId { get; set; }

    }
}
