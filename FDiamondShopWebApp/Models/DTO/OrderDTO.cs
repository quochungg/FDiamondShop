namespace FDiamondShop.API.Models.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.Now;

        public int PaymentId { get; set; }

        public decimal BasePrice { get; set; }

        public decimal TotalPrice { get; set; }

        public string? DiscountCodeId { get; set; }
        //public ICollection<CartLine> CartLines { get; set; }

    }
}
