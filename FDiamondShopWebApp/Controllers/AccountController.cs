using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Reflection.Metadata.Ecma335;
using System.Text;

namespace FDiamondShop.API.Controllers
{
    [Route("api/AccountAuth")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        private readonly FDiamondContext _context;
        protected APIResponse _response;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public AccountController(IAccountRepository accountRepository, IMapper mapper, IUnitOfWork unitOfWork,
            FDiamondContext context)

        {
            _accountRepository = accountRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _context = context;
            this._response = new();

        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO model)
        {
            var loginResponse = await _accountRepository.Login(model);
            if (loginResponse.User == null || string.IsNullOrEmpty(loginResponse.Token))
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Email or Password is incorrect");
                return BadRequest(_response);
            }

            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = loginResponse;
            return Ok(_response);

        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationRequestDTO model)
        {
            bool EmailUnique = _accountRepository.IsUniqueEmail(model.Email);
            bool EmailValid = _accountRepository.IsValidEmail(model.Email);
            bool PasswordValid = _accountRepository.IsValidPassword(model.PasswordHash);
            try
            {
                if (!EmailUnique)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages.Add("Email is alredy exist !");
                    return BadRequest(_response);
                }
                if (!EmailValid)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages.Add("Wrong format Email !");
                    return BadRequest(_response);
                }
                var account = await _accountRepository.Register(model);
                if (account == null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages.Add("Error when registing , Please try again !!!");
                    return BadRequest(_response);
                }
                if (!PasswordValid)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages.Add("Password must contain at least 1 Special Charater, 1 Uppercase, 8 Characters !");
                    return BadRequest(_response);
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest("ModelState");
                }
                if (model.PasswordHash != model.ConfirmPassWord)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages.Add("Wrong Confirm Password !");
                    return BadRequest(_response);
                }

                await _unitOfWork.SaveAsync();
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
            }

            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_response);

        }


        [HttpPost("registerEmployee")]
        public async Task<IActionResult> RegisterEmployee([FromBody] RegistrationEmployeeDTO model)
        {
            bool EmailUnique = _accountRepository.IsUniqueEmail(model.Email);
            bool EmailValid = _accountRepository.IsValidEmail(model.Email);
            
            try
            {
                if (!EmailUnique)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages.Add("Email is alredy exist !");
                    return BadRequest(_response);
                }
                if (!EmailValid)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages.Add("Wrong format Email !");
                    return BadRequest(_response);
                }
                var account = await _accountRepository.CreateEmployeeAccount(model);
                if (account == null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages.Add("Error when registing , Please try again !!!");
                    return BadRequest(_response);
                }              
                if (!ModelState.IsValid)
                {
                    return BadRequest("ModelState");
                }
                await _unitOfWork.SaveAsync();
                _response.StatusCode = HttpStatusCode.OK;               
                _response.IsSuccess = true;
                
            }

            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
            }

            return Ok(_response);

        }
        [HttpPut ("UpdateAccount")]
        public async Task<IActionResult> UpdateAccount([FromBody] UpdateAccountDTO model)
        {
            
            bool passwordValid = _accountRepository.IsValidPassword(model.NewPassword);
            if (!ModelState.IsValid)
            {
                return BadRequest("ModelState");
            }
            if (!passwordValid)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Wrong format Password !");
                return BadRequest(_response);
            }
            if(model.NewPassword != model.ConfimPassword) {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Wrong Confirm Password !");
                return BadRequest(_response);
            }
            _accountRepository.UpdateEmployeeAccount(model);
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            await _unitOfWork.SaveAsync();
            return Ok(_response);
        }
       
    }
}
