namespace FDiamondShop.API.Models.DTO
{
    public class ProductUpdateDTO
    {
        public int ProductId { get; set; }
        public int SubCategoryId { get; set; }
        public string ProductName { get; set; } = null!;

        public int Quantity { get; set; }

        public decimal BasePrice { get; set; }

        public string? Description { get; set; }

        public bool IsVisible { get; set; } = true;

        public bool IsDeleted { get; set; } = false;

        public virtual ICollection<ProductImageUpdateDTO> ProductImages { get; set; } = new List<ProductImageUpdateDTO>();

        public virtual ICollection<ProductVariantValueUpdateDTO> ProductVariantValues { get; set; } = new List<ProductVariantValueUpdateDTO>();
    }
}

