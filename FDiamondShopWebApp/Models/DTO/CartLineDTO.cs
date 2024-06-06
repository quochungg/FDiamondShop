namespace FDiamondShop.API.Models.DTO
{
    public class CartLineDTO
    {
        public int? OrderId { get; set; }
        public string UserId { get; set; }
        public bool IsOrdered { get; set; } = false;
        public virtual ICollection<CartLineItemDTO> CartLineItems { get; set; } = new List<CartLineItemDTO>();

    }
}
