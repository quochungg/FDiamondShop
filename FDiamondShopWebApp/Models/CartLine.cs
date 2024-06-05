namespace FDiamondShop.API.Models
{
    public class CartLine
    {
        public int CartLineId { get; set; }

        public int? OrderId { get; set; }

        public string UserId { get; set; }

        public Order? Order { get; set; }

        public bool IsOrdered { get; set; }

        public virtual ICollection<CartLineItem> CartLineItems { get; set; } = new List<CartLineItem>();

        public ApplicationUser User { get; set; }
    }
}
