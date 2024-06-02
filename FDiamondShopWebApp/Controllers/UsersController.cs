﻿using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Security.Principal;
using Microsoft.Identity.Client;
using AutoMapper;

namespace FDiamondShop.API.Controllers
{
    [Route("api/UsersAuth")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IUserRepository _userRepo;
        protected APIResponse _response;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        
        public UsersController(IUserRepository userRepo, IUnitOfWork unitOfWork, IMapper mapper)


        {
            _userRepo = userRepo;
            _response = new();
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO model)
        {
            var loginResponse = await _userRepo.Login(model);
            if (loginResponse.User == null || string.IsNullOrEmpty(loginResponse.Token))
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Username or password is incorrect");
                return BadRequest(_response);
            }
            
             
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = loginResponse;
            
            return Ok(_response);
        }

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromBody] RegistrationRequestDTO model)
        {
            bool checkValidFirstName = _userRepo.IsValidName(model.FirstName);
            bool checkValidLastName= _userRepo.IsValidName(model.LastName);
            var user = await _userRepo.Register(model);
            if (user == null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Error while registering");
                return BadRequest(_response);
            }
            if (!checkValidFirstName)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("FirstName can not contain special character or number");
                return BadRequest(_response);
            }
            if (!checkValidLastName)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("LastName can not contain special character or number");
                return BadRequest(_response);
            }

            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            await _unitOfWork.SaveAsync();
            return Ok(_response);
        }
        [HttpPatch("update")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update([FromBody] AccountUpdateDTO model)
        {
            var user = await _userRepo.Update(model);
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
            return Ok(_response);

        }


        [HttpGet("{username}", Name = "SearchUserByUserName")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<APIResponse>> SearchUserByUserName(string username)
        {

            IEnumerable<ApplicationUser> user = await _userRepo.GetAllAsync(u => u.UserName.Equals(username));

            if (user == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { $"User was not found." };
                return NotFound(_response);
            }
            try
            {
                var userDTO = _mapper.Map<List<UserDTO>>(user);
                _response.StatusCode = HttpStatusCode.OK;
                _response.Result = userDTO;
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

    }
}