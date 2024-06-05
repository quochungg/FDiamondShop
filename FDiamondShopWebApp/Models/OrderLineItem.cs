namespace FDiamondShop.API.Models
{
    public class OrderLineItem
    {
        public int OrderLineId { get; set; }

        public int ProductId { get; set; }

        public double? RingSize { get; set; }

        public decimal Price { get; set; }  

        public Product Product { get; set; }

        public OrderLine OrderLine { get; set; }
    }
}
