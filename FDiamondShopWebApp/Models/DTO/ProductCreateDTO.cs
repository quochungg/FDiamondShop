using System.ComponentModel.DataAnnotations;

namespace FDiamondShop.API.Models.DTO
{
    public class ProductCreateDTO
    {
        [Required]
        public string SubCategoryName { get; set; }
        [Required]
        public string ProductName { get; set; } = null!;
        public int Quantity { get; set; } = 1;
        [Required]
        public decimal BasePrice { get; set; }

        public string? Description { get; set; }

        public bool IsVisible { get; set; } = true;

        public virtual ICollection<ProductImageCreateDTO> ProductImages { get; set; } = null!;

        public virtual ICollection<ProductVariantValueCreateDTO> ProductVariantValues { get; set; } = null!;
    }
}
