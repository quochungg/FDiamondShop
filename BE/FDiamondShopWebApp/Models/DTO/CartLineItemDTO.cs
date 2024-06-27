namespace FDiamondShop.API.Models.DTO
{
    public class CartLineItemDTO
    {
        public int ProductId { get; set; }

        public double? RingSize { get; set; }
        public decimal Price { get; set; }

        public ProductDTO Product { get; set; }
        
    }
}
