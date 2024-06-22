namespace FDiamondShop.API.Models.DTO
{
    public class DashboardAccountDTO
    {
        public int TotalUser { get; set; }
        public Dictionary<string, int> CountOrderOfUserAsync { get; set; }
        public Dictionary<string, int> CountPaymentMethod { get; set; }
        public Dictionary<string, int> CountUserinRole { get; set; }
    }
}
