namespace FDiamondShop.API.Models
{
    public class OrderLine
    {
        public int OrderLineId { get; set; }

        public int OrderId { get; set; }

        public Order Order { get; set; }

        public virtual ICollection<OrderLineItem> OrderLineItems { get; set; } = new List<OrderLineItem>();
    }
}
