namespace FDiamondShop.API.Models.DTO
{
    public class OrderDashboardDTO
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public int DiscountPercent { get; set; }
        public decimal BasePrice { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; }
        public ICollection<ProductDashboardDTO> ProductDashboardDTOs { get; set; }
    }
}
