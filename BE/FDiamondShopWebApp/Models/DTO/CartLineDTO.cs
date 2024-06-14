namespace FDiamondShop.API.Models.DTO
{
    public class CartLineDTO
    {
        public int CartLineId { get; set; }
        public int? OrderId { get; set; }
        public Order? Order { get; set; }
        public bool IsOrdered { get; set; } = false;
        public virtual ICollection<CartLineItemDTO>? CartLineItems { get; set; } = new List<CartLineItemDTO>();
        //public virtual ApplicationUser User { get; set; }

    }
}
