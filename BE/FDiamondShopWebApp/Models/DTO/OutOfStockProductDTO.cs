namespace FDiamondShop.API.Models.DTO
{
    public class OutOfStockProductDTO
    {
        public int CartLineId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int? CurrentQuantity { get; set; }
    }
}
