namespace FDiamondShop.API.Models.DTO
{
    public class DiscountCodeUpdateDTO
    {
        public int DiscountPercent { get; set; }
        public DateTime? StartingDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
