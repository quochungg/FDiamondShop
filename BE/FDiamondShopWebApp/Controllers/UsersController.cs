using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.AspNetCore.Identity;
using AutoMapper;


namespace FDiamondShop.API.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UsersController : Controller
    {
        protected APIResponse _response;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        public UsersController(IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _response = new();
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
        }
       
        [HttpPost("login")]
        //[AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO model)
        {
            ////neu nguoi dung chua verify email, gui lai email confirm
            var user = await _userManager.FindByEmailAsync(model.UserName);
            
            var loginResponse = await _unitOfWork.UserRepository.Login(model);
            if (loginResponse.User == null || string.IsNullOrEmpty(loginResponse.Token))
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Username or password is incorrect");
                return BadRequest(_response);
            }
            if (!user.EmailConfirmed)
            {
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmationLink = Url.Action(nameof(ConfirmEmail), "Users", new { token = token, email = user.Email }, Request.Scheme);
                await _unitOfWork.UserRepository.SendEmailConfirmationAsync(user, confirmationLink);
                _response.StatusCode = HttpStatusCode.Forbidden;
                _response.IsSuccess = true;
                _response.ErrorMessages.Add("Please confirm your email before login.");
                return StatusCode(StatusCodes.Status403Forbidden, _response);
            }
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = loginResponse;

            return Ok(_response);
        }

        [HttpPost("register")]
        //[AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]

        public async Task<IActionResult> Register([FromBody] RegistrationRequestDTO model)
        {

            var User = _userManager.Users.FirstOrDefault(x => x.UserName == model.UserName);
            if (User != null)
            {
                _response.StatusCode = HttpStatusCode.Conflict;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("User already exists");
                return Conflict(_response);
            }
            if (!ModelState.IsValid)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.Result = ModelState;
                return BadRequest(_response);
            }
            var user = await _unitOfWork.UserRepository.Register(model);
            if (user == null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Error while registering");
                return BadRequest(_response);
            }
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationLink = Url.Action(nameof(ConfirmEmail), "Users", new { token = token, email = user.Email }, Request.Scheme);
            await _unitOfWork.UserRepository.SendEmailConfirmationAsync(user, confirmationLink);

            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            await _unitOfWork.SaveAsync();
            return CreatedAtRoute("searchuserbyusername", new { username = model.UserName }, _response);
        }

        [HttpPut("update")]
        //[Authorize("customer")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Update([FromBody] AccountUpdateDTO model)
        {                       
            var currentUser= await _userManager.FindByEmailAsync(model.UserName);
            if (!ModelState.IsValid)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.Result = ModelState;
                return BadRequest(_response);
            }
            if (!string.IsNullOrEmpty(model.NewPassword))
            {

                if (model.NewPassword != model.ConfimPassword)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages.Add("New password and confirmation password do not match.");
                    return BadRequest(_response);
                    
                }
            }           
            var user = await _unitOfWork.UserRepository.Update(model);
            if (user == null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Error while Updating");
                return BadRequest(_response);
            }
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            await _unitOfWork.SaveAsync();
            return NoContent();

        }
        
        [HttpPost("sendemail")]
        //[AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> SendEmailAsync(string emailTo)
        {
            MailRequestDTO mailRequestDTO = new()
            {
                Body = "Hello",
                Subject = "Test",
                toEmail = emailTo
            };
            await _unitOfWork.EmailRepository.SendEmailAsync(mailRequestDTO);
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            return Ok(_response);
        }

        [HttpGet("{username}", Name = "searchuserbyusername")]
        //[Authorize("admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]             
        public async Task<ActionResult<APIResponse>> SearchUserByUserName(string username)
        {
            try
            {
                var user = await _unitOfWork.UserRepository.GetUserByUsername(username);

                if (user == null)
                {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    _response.ErrorMessages = new List<string> { $"User was not found." };
                    return NotFound(_response);
                }
                _response.StatusCode = HttpStatusCode.OK;
                _response.Result = user;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
                return BadRequest(_response);
            }

        }
        [HttpGet("getalluser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllUser()
        {
            var users = await _unitOfWork.UserRepository.GetallUser();
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = users;

            return Ok(_response);
        }

        [HttpGet("confirmemail")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.ErrorMessages.Add("User not found.");
                return BadRequest(_response);
            }
            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {               
                return Redirect("http://localhost:5173/verified-email");
            }
            return BadRequest("Error confirming your email.");
        }
        
            
        
        [HttpPost("GoogleLogin")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> LoginGoogle([FromBody] string token)
        {
            GoogleRegisterDTO model = new()
            {
                IdToken = token
            };
            var payload = await _unitOfWork.UserRepository.ValidateGoogleAccessToken(model.IdToken);

            if (payload == null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Invalid google token");
                return BadRequest(_response);
            }
            var user = await _userManager.FindByEmailAsync(payload.email);
            
            if (user == null )
            {
                var registrationRequest = new GoogleRegistrationDTO
                {
                    UserName = payload.email,

                    Password = "",
                    Role = "customer",

                    FirstName = payload.givenName,
                    LastName = payload.familyName
                };
                user = await _unitOfWork.UserRepository.GoogleRegister(registrationRequest);
                user.EmailConfirmed = true;
                await _unitOfWork.SaveAsync();
            }
            if (user.PasswordHash != null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("User already exists");
                return BadRequest(_response);
            }

            var loginRequest = new GoogleLoginDTO
            {
                UserName = user.UserName,
                Password = "",
            };
            var loginResponse = await _unitOfWork.UserRepository.LoginGoogle(loginRequest);
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = loginResponse;
            return Ok(_response);
        }


    }
    
}

