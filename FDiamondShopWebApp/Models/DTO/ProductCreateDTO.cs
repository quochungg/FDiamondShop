using System.ComponentModel.DataAnnotations;

namespace FDiamondShop.API.Models.DTO
{
    public class ProductCreateDTO
    {
        [Required]
        public int SubCategoryId { get; set; }
        [Required]
        public string ProductName { get; set; } = null!;

        public int Quantity { get; set; } = 1;
        [Required]
        public decimal BasePrice { get; set; }

        public string? Description { get; set; }

        public bool IsVisible { get; set; } = true;

        public bool IsDeleted { get; set; } = false;

        public virtual ICollection<ProductImageDTO> ProductImages { get; set; }

        public virtual ICollection<ProductVariantValueDTO> ProductVariantValues { get; set; } 
        [Required]
        public virtual SubCategory SubCategory { get; set; } = null!;
    }
}
