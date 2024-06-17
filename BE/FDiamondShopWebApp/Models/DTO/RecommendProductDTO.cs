namespace FDiamondShop.API.Models.DTO
{
    public class RecommendProductDTO
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; } = null!;

        public decimal BasePrice { get; set; }

        public string? Description { get; set; }

        public virtual ICollection<ProductImageDTO> ProductImages { get; set; } = new List<ProductImageDTO>();

        public virtual ICollection<ProductVariantValueDTO> ProductVariantValues { get; set; } = new List<ProductVariantValueDTO>();

        public virtual ICollection<Product> ProductVariants { get; set; } = new List<Product>();
    }
}
