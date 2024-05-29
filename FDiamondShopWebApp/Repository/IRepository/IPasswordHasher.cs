namespace FDiamondShop.API.Repository.IRepository
{
    public interface IPasswordHasher
    {
        string HashPassword(string password);
        bool Verify(string passwordHash, string inputPassword);
    }
}
