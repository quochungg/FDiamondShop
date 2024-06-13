namespace FDiamondShop.API.Models
{
    public class Payment
    {
        public int PaymentId { get; set; }
        public string TransactionId { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public string PaymentMethod { get; set; }

        

    }
}
