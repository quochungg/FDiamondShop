﻿using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using Google.Apis.Auth;
using Google.Apis.Util;
using System.Text.Json;
using System.Text.RegularExpressions;


namespace FDiamondShop.API.Repository
{
    public class UserRepository : Repository<ApplicationUser>, IUserRepository
    {
        private readonly FDiamondContext _db;
        private readonly EmailSetting _emailSetting;
        private string secretKey;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHttpClientFactory _clientFactory;

        private readonly RoleManager<IdentityRole> _roleManager;
        public UserRepository(FDiamondContext db, IConfiguration configuration,
            UserManager<ApplicationUser> userManager,
            IMapper mapper,
            RoleManager<IdentityRole> roleManager,
            IOptions<EmailSetting> options,
            IHttpClientFactory httpClientFactory) : base(db)
        {
            this._emailSetting = options.Value;
            _db = db;
            _userManager = userManager;            
            secretKey = configuration.GetValue<string>("ApiSettings:Secret");
            _roleManager = roleManager;
            _clientFactory = httpClientFactory;
        }


        public async Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO)
        {
            bool isGoogle = false;
            if(loginRequestDTO.Password == "")
            {
                isGoogle = true;
            }
            var user = _db.ApplicationUsers.FirstOrDefault(u => u.UserName == loginRequestDTO.UserName);
            bool isValid = await _userManager.CheckPasswordAsync(user, loginRequestDTO.Password);

            
            if((user!=null && isValid == true) || (user!=null && isValid==false && isGoogle == true))
            {
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
                    //User = _mapper.Map<UserDTO>(user),
                    Token = tokenHandler.WriteToken(token),
                    User = new()
                    {
                        Address = user.Address,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        PhoneNumber = user.PhoneNumber,
                        UserName = user.UserName
                    },
                    Role = roles.FirstOrDefault()

                };
                return loginResponseDTO;
            }
            else
            {
                return new LoginResponseDTO()
                {
                    User = null,
                    Token = "",
                    Role = null
                };
            }

        }

        public async Task<ApplicationUser> Register(RegistrationRequestDTO registerationRequestDTO)
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
                var User= _userManager.Users.FirstOrDefault(u=>u.UserName==user.UserName);
                if (User != null)
                {
                    throw new Exception("User already exists");
                }
                var result = await _userManager.CreateAsync(user, registerationRequestDTO.Password);
                if (result.Succeeded)
                   
                {
                    string role = registerationRequestDTO.Role.ToLower(); 
                    if(role== "admin" ||  role =="customer" || role == "deliverystaff" || role == "ordermanagementstaff")
                    {
                        if (!await _roleManager.RoleExistsAsync(role))
                        {
                            await _roleManager.CreateAsync(new IdentityRole(role));
                        }
                        
                        await _userManager.AddToRoleAsync(user, role);
                        var userToReturn = _db.ApplicationUsers.FirstOrDefault(u => u.UserName == registerationRequestDTO.UserName);
                        return userToReturn;
                    }
                    else
                    {
                        var userToDelete = await _userManager.FindByEmailAsync(registerationRequestDTO.UserName);
                        await _userManager.DeleteAsync(userToDelete);
                        throw new Exception("Wrong role");
                        

                    }

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
            const string Pattern = @"^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$";
            const string DefaultErrorMessage = "Password must be at least 6 characters and contain at least 1 uppercase letter, 1 number, and 1 special character.";
            var user = await _userManager.FindByEmailAsync(accountUpdateDTO.UserName);
            if (user == null)
            {
                throw new Exception("USER NOT FOUND");
            }
            user.FirstName = accountUpdateDTO.FirstName;
            user.LastName = accountUpdateDTO.LastName;
            user.Address = accountUpdateDTO.Address;
            user.PhoneNumber = accountUpdateDTO.PhoneNumber;
            if (accountUpdateDTO.Password != null)
            {
                if (!await _userManager.CheckPasswordAsync(user, accountUpdateDTO.Password) && accountUpdateDTO.Password != null)
                {
                    throw new Exception("Current password is incorrect.");
                }

                if (accountUpdateDTO.NewPassword != null && !Regex.IsMatch(accountUpdateDTO.NewPassword, Pattern))
                {
                    throw new Exception(DefaultErrorMessage);
                }
                if (accountUpdateDTO.NewPassword == accountUpdateDTO.Password)
                {
                    throw new Exception("New password and current password are the same.");
                }
                if (accountUpdateDTO.NewPassword != accountUpdateDTO.ConfirmPassword)
                {
                    throw new Exception("New password and confirmation password do not match.");
                }
                var passwordChange = await _userManager.ChangePasswordAsync(user, accountUpdateDTO.Password, accountUpdateDTO.NewPassword);
            } 
            else 
            {
                if(accountUpdateDTO.NewPassword !=null || accountUpdateDTO.ConfirmPassword != null)
                {
                    throw new Exception("Current password is required");
                }
                var currentPassword = await _userManager.ChangePasswordAsync(user, user.PasswordHash, user.PasswordHash);
            }
             
                
            
             
            
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
                Address = updatedUser.Address,
                PhoneNumber = updatedUser.PhoneNumber,
            
            };

            return userDTO;

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
                UserName = user.UserName,
                IsGoogleAccount = (user.PasswordHash == null)               
            };
            return dto;
        }
        public async Task<List<UserDTO>> GetallUser()
        {
            
                var users = _userManager.Users.ToList();
                List<UserDTO> userDTOs = new List<UserDTO>();

                foreach (var user in users)
                {
                    UserDTO userDTO = new UserDTO
                    {
                        UserName = user.UserName,
                        Address = user.Address,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        PhoneNumber = user.PhoneNumber,
                        IsGoogleAccount = (user.PasswordHash == null),
                        Role = _userManager.GetRolesAsync(user).Result.FirstOrDefault()
                    };
                    userDTOs.Add(userDTO);
                }
                return userDTOs;
            


        }

        public async Task SendEmailConfirmationAsync(ApplicationUser user, string confirmationLink)
        {
            var message = new MimeMessage();
            message.Sender = MailboxAddress.Parse(_emailSetting.Mail);
            message.To.Add(MailboxAddress.Parse(user.Email));
            message.Subject = "Please Confirm Your Email Address";
            message.Body = new TextPart("html")
            {
                Text = $@"
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }}
                        .container {{
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }}
                        .header {{
                            font-size: 24px;
                            margin-bottom: 20px;
                            text-align: center;
                        }}
                        .content {{
                            font-size: 16px;
                        }}
                        .button {{
                            display: inline-block;
                            margin-top: 20px;
                            padding: 10px 20px;
                            font-size: 16px;
                            color: #ffffff;
                            background-color: #007bff;
                            text-decoration: none;
                            border-radius: 5px;
                        }}
                        .footer {{
                            margin-top: 20px;
                            font-size: 14px;
                            text-align: center;
                            color: #777;
                        }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            Confirm Your Email Address
                        </div>
                        <div class='content'>
                            <p>Hi {user.LastName},</p>
                            <p>Thank you for signing up! To complete your registration, please confirm your email address by clicking the button below:</p>
                            <a href='{confirmationLink}' class='button'>Confirm Email</a>
                            <p>If you didn't sign up for an account, please ignore this email or let us know.</p>
                        </div>
                        <div class='footer'>
                            <p>Best regards,<br>The FDiamond Team</p>
                            <p>P.S. If you have any questions or need assistance, feel free to contact our support team.</p>
                        </div>
                    </div>
                </body>
                </html>"
            };
            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_emailSetting.Host, _emailSetting.Port, SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_emailSetting.Mail, _emailSetting.Password);
            await smtp.SendAsync(message);
            smtp.Disconnect(true);
        }

        public async Task<IdentityResult> ConfirmEmailAsync(string email, string token)
        {var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return IdentityResult.Failed(new IdentityError { Description = "Invalid email confirmation request." });

            return await _userManager.ConfirmEmailAsync(user, token);
        }

        public async Task<GoogleUserInfo> ValidateGoogleAccessToken(string accessToken)
        {
            var client = _clientFactory.CreateClient();
            var response = await client.GetStringAsync($"https://www.googleapis.com/oauth2/v3/userinfo?access_token={accessToken}");
            var userInfo = JsonSerializer.Deserialize<GoogleUserInfo>(response);
            
            if (userInfo == null || string.IsNullOrEmpty(userInfo.sub))
            {
                throw new Exception("Invalid access token.");
            }
            return userInfo;
        }

        public async Task<ApplicationUser> GoogleRegister(GoogleRegistrationDTO registrationRequestDTO)
        {
            ApplicationUser user = new()
            {
                UserName = registrationRequestDTO.UserName,
                Email = registrationRequestDTO.UserName,
                NormalizedEmail = registrationRequestDTO.UserName.ToUpper(),
                FirstName = registrationRequestDTO.FirstName,
                LastName = registrationRequestDTO.LastName,
                Address = registrationRequestDTO.Address,
                PhoneNumber = registrationRequestDTO.PhoneNumber
            };
            try
            {
                var User = _userManager.Users.FirstOrDefault(u => u.UserName == user.UserName);
                if (User != null)
                {
                    throw new Exception("User already exists");
                }
                var result = await _userManager.CreateAsync(user);
                
                
                if (result.Succeeded || !result.Succeeded)

                {
                    string role = registrationRequestDTO.Role.ToLower();
                    if (role == "admin" || role == "customer" || role == "manager")
                    {
                        if (!await _roleManager.RoleExistsAsync(role))
                        {
                            await _roleManager.CreateAsync(new IdentityRole(role));
                        }

                        await _userManager.AddToRoleAsync(user, role);
                        var userToReturn = _db.ApplicationUsers.FirstOrDefault(u => u.UserName == registrationRequestDTO.UserName);
                        return userToReturn;
                    }
                    else
                    {
                        throw new Exception("Wrong role");
                    }

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
        public async Task<LoginResponseDTO> LoginGoogle(GoogleLoginDTO googleLoginDTO)
        {
            var user = _db.ApplicationUsers.FirstOrDefault(u => u.UserName == googleLoginDTO.UserName);          
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
                //User = _mapper.Map<UserDTO>(user),
                Token = tokenHandler.WriteToken(token),
                User = new()
                {
                    FirstName = user.FirstName,
                    Address = user.Address,
                    LastName = user.LastName,
                    PhoneNumber = user.PhoneNumber,
                    UserName = user.UserName
                },
                Role = roles.FirstOrDefault()

            };
            return loginResponseDTO;
        }
    }
}
