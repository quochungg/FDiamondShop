using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IUserRepository: IRepository<ApplicationUser>
    {
        
        Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO);
        Task<UserDTO> Register(RegistrationRequestDTO registrationRequestDTO);
        Task<UserDTO> Update(AccountUpdateDTO updateAccountDTO);
        Task<UserDTO> GetUserByUsername(string username);
    }
}
