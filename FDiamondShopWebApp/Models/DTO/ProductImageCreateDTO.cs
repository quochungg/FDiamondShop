namespace FDiamondShop.API.Models.DTO
{
    public class ProductImageCreateDTO
    {
        public int? ProductId { get; set; }

        public string ImageUrl { get; set; } = null!;

        public bool? IsGia { get; set; }

        public virtual Product Product { get; set; } = null!;
    }
}
