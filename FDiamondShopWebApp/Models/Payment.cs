namespace FDiamondShop.API.Models
{
    public class Payment
    {
        public int Id { get; set; }

        public int OrderId { get; set; }

        public decimal Amount { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public int PaymentMethodId { get; set; }

        public PaymentMethod PaymentMethod { get; set; }

    }
}
