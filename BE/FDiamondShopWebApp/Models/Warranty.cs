namespace FDiamondShop.API.Models
{
    public class Warranty
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public string CustomerName { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public byte[] WarrantyPDF { get; set; }

    }
}
