using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IAccountRepository
    {
        bool IsUniqueEmail(string email);
        Task<LoginResponseDTO> Login (LoginRequestDTO loginRequestDTO);
        Task<Account> Register(RegistrationRequestDTO registrationRequestDTO);
        bool IsValidEmail(string email);
        bool IsValidPassword(string password);
       
    }
}
