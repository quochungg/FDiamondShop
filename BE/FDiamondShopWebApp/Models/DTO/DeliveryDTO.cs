namespace FDiamondShop.API.Models.DTO
{
    public class DeliveryDTO
    {
        public int DeliveryDetailId { get; set; }
        public string UserId { get; set; }
        public DateTime ReceiveDate { get; set; } = DateTime.Now;
    }
}
