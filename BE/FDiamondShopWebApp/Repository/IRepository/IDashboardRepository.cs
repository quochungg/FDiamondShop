namespace FDiamondShop.API.Repository.IRepository
{
    public interface IDashboardRepository
    {
        public Task<Dictionary<string, int>> CountOrderOfUserAsync();
        public Task<Dictionary<string, int>> CountPaymentMethodAsync();
        public Task<Dictionary<string, int>> CountUserinRoleAsync();
    }
}
