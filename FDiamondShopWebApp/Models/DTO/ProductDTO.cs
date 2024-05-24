namespace FDiamondShopWebApp.Models.DTO
{
    public class ProductDTO
    {
        public int ProductId { get; set; }

        public int? SubCategoryId { get; set; }

        public string ProductName { get; set; } = null!;

        public int Quantity { get; set; }

        public decimal BasePrice { get; set; }

        public string? Description { get; set; }
    }
}
