using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Models;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Repository.IRepository;
using System.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace FDiamondShop.API.Controllers
{
    [Route("api/Order")]
    [ApiController]
    public class OrderController:ControllerBase
    {
        private readonly APIResponse _response;
        private readonly FDiamondContext _db;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public OrderController(IUnitOfWork unitOfWork, FDiamondContext db, IMapper mapper, 
            UserManager<ApplicationUser> userManager)
        {
            this._response = new();
            _unitOfWork = unitOfWork;
            _db = db;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpPost(Name = "CreateOrder")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> CreateOrder(string userName, [FromBody] OrderCreateDTO createDTO)
        {
            try
            {
                var user = _userManager.Users.First(u => u.UserName == userName);
                var Paymentmethod = _db.PaymentMethods.First(pm => pm.Id == createDTO.PaymentId);
                OrderDTO orderDTO = new()
                {
                    UserId = user.Id,
                    PaymentId= Paymentmethod.Id,

                };
                               
                var order = _mapper.Map<Order>(createDTO);
                await _unitOfWork.OderRepository.CreateAsync(order);
                await _unitOfWork.SaveAsync();
                _response.Result = _mapper.Map<OrderDTO>(order);

                _response.StatusCode = HttpStatusCode.Created;
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
