using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using Google.Apis.Auth;

namespace FDiamondShop.API.Repository.IRepository
{
    public interface IUserRepository: IRepository<ApplicationUser>
    {
        
        Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO);
        Task<ApplicationUser> Register(RegistrationRequestDTO registrationRequestDTO);
        Task<ApplicationUser> GoogleRegister(GoogleRegistrationDTO registrationRequestDTO);
        Task<UserDTO> Update(AccountUpdateDTO updateAccountDTO);
        Task<UserDTO> GetUserByUsername(string username);
        Task SendEmailConfirmationAsync(ApplicationUser user, string confirmationLink);
        public Task<List<UserDTO>> GetallUser();
        public Task<GoogleUserInfo> ValidateGoogleAccessToken(string accessToken);
        public Task<LoginResponseDTO> LoginGoogle(GoogleLoginDTO googleLoginDTO);
    }
}
