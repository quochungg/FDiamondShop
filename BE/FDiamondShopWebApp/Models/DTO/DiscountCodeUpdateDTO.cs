namespace FDiamondShop.API.Models.DTO
{
    public class DiscountCodeUpdateDTO
    {
        public int DiscountPercent { get; set; }
        public string? StartingDate { get; set; }
        public string? EndDate { get; set; }
    }
}
