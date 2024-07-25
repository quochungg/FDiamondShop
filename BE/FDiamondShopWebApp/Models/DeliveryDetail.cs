namespace FDiamondShop.API.Models
{
    public class DeliveryDetail
    {
        public int DeliveryDetailId { get; set; }
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public DateTime ReceiveDate { get; set; } = DateTime.Now;

    }
}
