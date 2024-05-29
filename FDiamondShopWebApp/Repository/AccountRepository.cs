using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace FDiamondShop.API.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly FDiamondContext _context;
        private readonly IMapper _mapper;
        private string sercetKey;
        private readonly IPasswordHasher _passwordHasher;
        
        public AccountRepository(FDiamondContext context,IMapper mapper,IConfiguration configuration,IPasswordHasher passwordHasher)
        {
            _context = context;
            _mapper = mapper;
            sercetKey = configuration.GetValue<string>("ApiSettings:Secrect");
            _passwordHasher = passwordHasher;
        }
       

        public bool IsUniqueEmail(string email)
        {
            var user = _context.Accounts.FirstOrDefault(u => u.Email == email);
                if(user == null)
                {
                return true;
                
                }

            return false;

        }

        public bool IsValidEmail(string email)
        {
            var trimmedEmail = email.Trim();
            if (string.IsNullOrWhiteSpace(email))
            {
                return false;
            }
            if (trimmedEmail.EndsWith("."))
            {
                return false; 
            }
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == trimmedEmail;
            }
            catch
            {
                return false;
            }
        }

        public bool IsValidPassword(string password)
        {
            if(string.IsNullOrWhiteSpace(password))
            {
                return false;
            }
            string pattern = @"^(?=.*[A-Z])(?=.*\W).{8,}$";
            Regex regex = new Regex(pattern);

            bool Ismatch= regex.IsMatch(password);
            if (Ismatch)
            {
                return true;
            }
            return false;

        }

        public async Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO)
        {
            
            var account = _context.Accounts.FirstOrDefault(x=>x.Email == loginRequestDTO.Email);
            var result=_passwordHasher.Verify(account.PasswordHash, loginRequestDTO.PasswordHash);

             
            if(account == null || !result)
            {
                return new LoginResponseDTO() {
                    Token = "",
                    User = null
                };
            }
            // if user found then generate JWT Token

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(sercetKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, account.Email.ToString()),
                    new Claim(ClaimTypes.Role, account.Role)
                }),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token=tokenHandler.CreateToken(tokenDescriptor);
            LoginResponseDTO loginResponseDTO = new LoginResponseDTO()
            {
                Token = tokenHandler.WriteToken(token),
                User = account
            };
            return loginResponseDTO;
        }       
        public async Task<Account> Register(RegistrationRequestDTO registrationRequestDTO)
        {
            
            var passwordHasher = _passwordHasher.HashPassword(registrationRequestDTO.PasswordHash);
            Account account = new Account();
            {
                account.Email = registrationRequestDTO.Email;
                account.FirstName = registrationRequestDTO.FirstName;
                account.LastName = registrationRequestDTO.LastName;
                account.PasswordHash = passwordHasher;
            }
            _context.Add(account);           
          return account;
  
        }

        
    }
}
