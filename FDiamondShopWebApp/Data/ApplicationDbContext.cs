using Microsoft.EntityFrameworkCore;

namespace FDiamondShopWebApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> option) : base(option)
        {

        }

    }
}
