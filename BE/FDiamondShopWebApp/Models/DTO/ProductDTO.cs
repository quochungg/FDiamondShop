namespace FDiamondShop.API.Models.DTO
{
    public class ProductDTO
    {
        public int ProductId { get; set; }

        public int CategoryId { get; set; }

        public string CategoryName { get; set; }

        public int SubCategoryId { get; set; }

        public string SubCategoryName { get; set; }

        public string ProductName { get; set; } = null!;

        public int? Quantity { get; set; }

        public decimal BasePrice { get; set; }

        public string? Description { get; set; }

        public bool IsVisible { get; set; } = true;

        public bool IsDeleted { get; set; } = false;

        public virtual ICollection<ProductImageDTO> ProductImages { get; set; } = new List<ProductImageDTO>();

        public virtual ICollection<ProductVariantValueDTO> ProductVariantValues { get; set; } = new List<ProductVariantValueDTO>();

        public virtual ICollection<RecommendProductDTO> RecommendProducts { get; set; } = new List<RecommendProductDTO>();

    }
}
