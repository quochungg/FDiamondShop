namespace FDiamondShop.API.Models.DTO
{
    public class DiscountCodeUpdateDTO
    {
        public int DiscountPercent { get; set; } = 0;
        public DateTime? StartingDate { get; set; } = DateTime.Now;
        public DateTime? EndDate { get; set; } = DateTime.Now;
        public bool IsExpried { get; set; } = false;
    }
}
