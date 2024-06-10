namespace FDiamondShop.API.Models
{
    public class CartLineItem
    {
        public int CartLineId { get; set; }

        public int ProductId { get; set; }

        public double? RingSize { get; set; }

        public decimal Price { get; set; }  

        public Product Product { get; set; }

        public CartLine CartLine { get; set; }
    }
}
