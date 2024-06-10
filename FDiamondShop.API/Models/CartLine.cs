namespace FDiamondShop.API.Models
{
    public class CartLine
    {
        public int CartLineId { get; set; }

        public int? OrderId { get; set; }

        public Order? Order { get; set; }

        public string UserId { get; set; }

        public ApplicationUser User { get; set; }

        public bool IsOrdered { get; set; }  = false;

        public virtual ICollection<CartLineItem> CartLineItems { get; set; } = new List<CartLineItem>();
    
    }
}
