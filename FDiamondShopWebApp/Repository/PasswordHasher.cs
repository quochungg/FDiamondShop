using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;

namespace FDiamondShop.API.Repository
{
    public class PasswordHasher : IPasswordHasher
    {
        private const int SaltSize = 64 / 8;
        private const int KeySize = 128 / 8;
        private const int Interations = 10000;
        private static readonly HashAlgorithmName hashAlgorithmName = HashAlgorithmName.SHA256;
        private const char Delimiter = ';';
        public string HashPassword(string password)
        {
            var salt = RandomNumberGenerator.GetBytes(SaltSize);
            var hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Interations, hashAlgorithmName, KeySize);
            return string.Join(Delimiter, Convert.ToBase64String(salt), Convert.ToBase64String(hash));
        }
        public bool Verify(string passwordHash, string inputPassword)
        {
            var element = passwordHash.Split(Delimiter);
            var salt = Convert.FromBase64String(element[0]);
            var hash = Convert.FromBase64String(element[1]);
            var hashInput = Rfc2898DeriveBytes.Pbkdf2(inputPassword, salt, Interations, hashAlgorithmName,KeySize);
            return CryptographicOperations.FixedTimeEquals(hash, hashInput);
        }
    }
}
