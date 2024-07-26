namespace FDiamondShop.API.Models.DTO
{
    public class DeliveryDTO
    {
        public int DeliveryDetailId { get; set; }
        public string UserId { get; set; }
        public DateTime ReceiveDate { get; set; } = DateTime.Now;
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Note { get; set; } = string.Empty;
        public string LastName { get; set; }
        public string FirstName { get; set; }

    }
}
