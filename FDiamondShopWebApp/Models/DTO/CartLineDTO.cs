namespace FDiamondShop.API.Models.DTO
{
    public class CartLineDTO
    {
        public int? OrderId { get; set; }
        public string UserId { get; set; } = null!;
        public bool IsOrdered { get; set; } = false;
        public virtual ICollection<CartLineItemDTO>? CartLineItems { get; set; } = new List<CartLineItemDTO>();
        public virtual ApplicationUser User { get; set; }

    }
}
