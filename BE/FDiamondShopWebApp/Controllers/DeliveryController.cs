using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace FDiamondShop.API.Controllers
{
    [Route("api/Delivery")]
    [ApiController]
    public class DeliveryController : ControllerBase
    {
        private readonly APIResponse _response;
        private readonly FDiamondContext _db;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly HttpClient _httpClient;
        public DeliveryController(IUnitOfWork unitOfWork, FDiamondContext db, IMapper mapper,
            UserManager<ApplicationUser> userManager, HttpClient httpClient)
        {
            this._response = new();
            _unitOfWork = unitOfWork;
            _db = db;
            _mapper = mapper;
            _userManager = userManager;
            _httpClient = httpClient;
        }
        [HttpGet("GetAllDeliveryStaff")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllDeliveryStaff()
        {
            var users = await _unitOfWork.DeliveryRepository.GetDeliveryStaff();
            if(users.Count() == 0)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = true;
                _response.ErrorMessages = new List<string> { "EMPTY" };
                return NotFound(_response);
            }
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = users;
            return Ok(_response);

        }

        [HttpGet("GetOrdermanagementStaff")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllOrdermanagementStaff()
        {
            var users = await _unitOfWork.DeliveryRepository.GetOrdermanagementStaff();
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = users;
            return Ok(_response);

        }
        [HttpPost("AssignToDeliveryStaff")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> AssignToDeliveryStaff([FromBody] AssignCreateDTO createDTO)
        {
            try
            {
                var deliverystaff = _userManager.Users.FirstOrDefault(us => us.Id == createDTO.UserId);
                var order = _unitOfWork.OrderRepository.GetOrderbyId(createDTO.OrderId);
                if (order.Status.Equals("Preparing") || order.Status.Equals("Idle"))
                {
                    var detail = _unitOfWork.DeliveryRepository.GetDeliveryDetailbyId(order.DeliveryDetailId);
                    detail.UserId = deliverystaff.Id;
                    order.Status = "Shipping";
                    order.UpdateDate = DateTime.Now;
                    await _unitOfWork.SaveAsync();
                    _response.IsSuccess = true;
                    _response.StatusCode = HttpStatusCode.OK;
                    return Ok(_response);
                }
                else
                {
                    _response.ErrorMessages = new List<string> { "CAN NOT ASSIGN THE ORDER THAT ASSIGNED AND ORDER THAT NOT PREPARED" };
                    return BadRequest(_response);
                }
                
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
                return BadRequest(_response);
            }
        }
        [HttpGet("GetAllOrderForDeliveryStaff")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllOrderForDeliveryStaff(string id)
        {
            var orders = await _unitOfWork.OrderRepository.GetAllOrderForDelivery(id);
            if(orders.Count()==0)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = true;
                _response.ErrorMessages = new List<string> { "EMPTY" };
                return NotFound(_response);
            }
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = orders;
            return Ok(_response);
            
            
        }
        [HttpPut("UpdateOrderStatus")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateOrderStatus([FromBody] OrderStatusDTO model) 
        {
            var order=_unitOfWork.OrderRepository.GetOrderbyId(model.OrderId);
            if (order == null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "Order not found" };
                return BadRequest(_response);
            }
            order.Status = model.Status;
            await _unitOfWork.DeliveryRepository.UpdateOrderStatus(order);
            _response.IsSuccess = true;
            _response.StatusCode = HttpStatusCode.OK;
            await _unitOfWork.SaveAsync();
            return Ok(_response);
        } 
    }
}
