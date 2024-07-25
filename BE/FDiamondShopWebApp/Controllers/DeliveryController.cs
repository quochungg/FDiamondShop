using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Http.HttpResults;
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
        [HttpGet("GetDeliveryStaff")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllDeliveryStaff()
        {
            var users = await _unitOfWork.DeliveryRepository.GetDeliveryStaff();
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = users;
            return Ok(_response);

        }

        [HttpPost(Name = "CreateDelivery")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> CreateDelivery([FromBody] DeliveryCreateDTO createDTO)
        {
            try
            {
                var deliverystaff = _userManager.Users.FirstOrDefault(us=>us.UserName == createDTO.UserName);
                var deliverydetail = _mapper.Map<DeliveryDetail>(createDTO);
                deliverydetail.UserId = deliverystaff.Id;
                await _unitOfWork.DeliveryRepository.CreateAsync(deliverydetail);
                await _unitOfWork.SaveAsync();
                //Create new Delivery, Assign for staff
                var order = _db.Orders.FirstOrDefault(or=>or.OrderId == createDTO.OrderId);
                order.DeliveryDetailId = deliverydetail.DeliveryDetailId;
                await _unitOfWork.SaveAsync();
                //Update DeliveryDetailId in Order table
                _response.IsSuccess = true;
                _response.StatusCode = HttpStatusCode.OK;
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
