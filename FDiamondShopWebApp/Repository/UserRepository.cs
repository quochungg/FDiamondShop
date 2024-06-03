using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace FDiamondShop.API.Repository
{
    public class UserRepository : Repository<ApplicationUser>, IUserRepository
    {
        private readonly FDiamondContext _db;
        private string secretKey;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private readonly RoleManager<IdentityRole> _roleManager;
        public UserRepository(FDiamondContext db, IConfiguration configuration, UserManager<ApplicationUser> userManager, 
            IMapper mapper, RoleManager<IdentityRole> roleManager):base(db)
        {
            _db = db;
            _userManager = userManager;
            _mapper = mapper;
            secretKey = configuration.GetValue<string>("ApiSettings:Secret");
            _roleManager = roleManager;
        }
        

        public async Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO)
        {
            var user = _db.ApplicationUsers.FirstOrDefault(u => u.UserName.ToLower() == loginRequestDTO.UserName.ToLower());
            bool isValid = await _userManager.CheckPasswordAsync(user, loginRequestDTO.Password);

            if (user == null || isValid == false)
            {
                return new LoginResponseDTO()
                {
                    Token = "",
                    User = null
                };
            }


            //if user was found generate JWT Token
            var roles = await _userManager.GetRolesAsync(user);
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, roles.FirstOrDefault()),
                    new Claim("TokenId",Guid.NewGuid().ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            LoginResponseDTO loginResponseDTO = new LoginResponseDTO()
            {
                Token = tokenHandler.WriteToken(token),
                User = _mapper.Map<UserDTO>(user),
                Role = roles.FirstOrDefault()
            };
            return loginResponseDTO;
        }

        public async Task<UserDTO> Register(RegistrationRequestDTO registerationRequestDTO)
        {

            ApplicationUser user = new()
            {
                UserName = registerationRequestDTO.UserName,
                Email = registerationRequestDTO.UserName,
                NormalizedEmail = registerationRequestDTO.UserName.ToUpper(),
                FirstName = registerationRequestDTO.FirstName,
                LastName = registerationRequestDTO.LastName,
                Address = registerationRequestDTO.Address,
                PhoneNumber = registerationRequestDTO.PhoneNumber
            };
            try
            {
                var result = await _userManager.CreateAsync(user, registerationRequestDTO.Password);
                if (result.Succeeded)
                {
                    string role = registerationRequestDTO.Role ?? "customer";
                    if (role == "customer" || role == "admin" || role == "employees")
                    {
                        if (!_roleManager.RoleExistsAsync(role).GetAwaiter().GetResult())
                        {
                            await _roleManager.CreateAsync(new IdentityRole(role));
                        }
                        await _userManager.AddToRoleAsync(user, role);
                    }
                    else
                    {
                        throw new Exception("Wrong role");
                    }
                    
                    var userToReturn = _db.ApplicationUsers.FirstOrDefault(u => u.UserName == registerationRequestDTO.UserName);
                    return _mapper.Map<UserDTO>(userToReturn);
                }
                else
                {
                    // Log or handle the errors
                    var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                    throw new Exception($"User creation failed: {errors}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred during registration: {ex.Message}", ex);
            }
        }

        public async Task<UserDTO> Update(AccountUpdateDTO accountUpdateDTO)
        {
            var user =await _userManager.FindByEmailAsync(accountUpdateDTO.UserName);
            if (user == null)
            {
                throw new Exception("USER NOT FOUND");
            }
            user.FirstName = accountUpdateDTO.FirstName;
            user.LastName = accountUpdateDTO.LastName;
            if (!string.IsNullOrEmpty(accountUpdateDTO.NewPassword))
            {
                
                if (!await _userManager.CheckPasswordAsync(user, accountUpdateDTO.Password))
                {
                    throw new Exception("Current password is incorrect.");
                }

                
                if (accountUpdateDTO.NewPassword != accountUpdateDTO.ConfimPassword)
                {
                    throw new Exception("New password and confirmation password do not match.");
                }
            }
            var passwordChange=await _userManager.ChangePasswordAsync(user,accountUpdateDTO.Password,accountUpdateDTO.NewPassword);
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new Exception($"User update failed: {errors}");
            }
            var updatedUser = await _userManager.FindByEmailAsync(accountUpdateDTO.UserName);
            var userDTO = new UserDTO
            {
                
                FirstName = updatedUser.FirstName,
                LastName = updatedUser.LastName,
                UserName= updatedUser.UserName,
                
            };

            return userDTO;

        }

        public bool IsValidName(string input)
        {
            string pattern = @"[\d\W_]";
            Regex regex = new Regex(pattern);

            // Kiểm tra chuỗi với biểu thức chính quy
            if (regex.IsMatch(input))
            {
                return false;
            }
            return true;
        }

        public async Task<UserDTO> GetUserByUsername(string username)
        {
            var user = await _userManager.FindByNameAsync(username) ?? throw new Exception("User not found");
            UserDTO dto = new()
            {
                Address = user.Address,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                UserName = user.UserName
            };
            return dto;
        }
        
    }
}
