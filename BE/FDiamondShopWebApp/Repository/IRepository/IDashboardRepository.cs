namespace FDiamondShop.API.Repository.IRepository
{
    public interface IDashboardRepository
    {
         public  Task<Dictionary<string, int>> CountOrderOfUserAsync();
    }
}
