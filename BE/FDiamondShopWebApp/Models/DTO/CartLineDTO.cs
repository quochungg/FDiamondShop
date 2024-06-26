namespace FDiamondShop.API.Models.DTO
{
    public class CartLineDTO
    {
        public int CartLineId { get; set; }
        public virtual ICollection<CartLineItemDTO>? CartLineItems { get; set; } = new List<CartLineItemDTO>();
        //public virtual ApplicationUser User { get; set; }

    }
}
