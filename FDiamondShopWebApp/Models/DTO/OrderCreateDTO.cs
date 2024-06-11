namespace FDiamondShop.API.Models.DTO
{
    public class OrderCreateDTO
    {
        public int Id { get; set; }
        public string UserId { get; set; }  
        public int PaymentId { get; set; }
        public string? DiscountCodeId { get; set; }
        public int CartLineId { get; set; }
        public virtual ICollection<CartLineDTO>? CartLines { get; set; } = new List<CartLineDTO>();


    }
}
