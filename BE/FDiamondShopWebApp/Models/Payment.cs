namespace FDiamondShop.API.Models
{
    public class Payment
    {
        public int Id { get; set; }

        public int TransactionId { get; set; }

        public decimal Amount { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public string PaymentMethod { get; set; }

    }
}
