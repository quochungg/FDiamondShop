namespace FDiamondShop.API.Models.DTO
{
    public class RecommendProductDTO
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; } = null!;

        public decimal BasePrice { get; set; }

        public virtual ICollection<ProductImageDTO> ProductImages { get; set; } = new List<ProductImageDTO>();

    }
}
