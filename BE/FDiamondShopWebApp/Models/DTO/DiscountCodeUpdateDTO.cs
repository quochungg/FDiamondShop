namespace FDiamondShop.API.Models.DTO
{
    public class DiscountCodeUpdateDTO
    {
        public int DiscountPercent { get; set; } = 0;
        public DateTime? StartingDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsExpried { get; set; } = false;
    }
}
