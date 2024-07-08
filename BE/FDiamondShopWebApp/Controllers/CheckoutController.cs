using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Helper;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace FDiamondShop.API.Controllers
{
    [Route("api/checkout")]
    [ApiController]
    public class CheckoutController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly APIResponse _response;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly FDiamondContext _db;
        public CheckoutController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<ApplicationUser> userManager, FDiamondContext db)
        {
            _unitOfWork = unitOfWork;
            _response = new();
            _mapper = mapper;
            _userManager = userManager;
            _db = db;
        }

        [HttpPost("vnpay")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public IActionResult CreatePaymentUrl([FromBody] PaymentInformationModel model)
        {
            try
            {
                var paymentUrl = _unitOfWork.VnPayRepository.CreatePaymentUrl(model, HttpContext);
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = paymentUrl;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add(ex.Message);
                return BadRequest(_response);
            }

        }
        [HttpGet("executepay")]
        public async Task<IActionResult> PaymentExecute()
        {
            var user = _userManager.Users.First();
            var order = await _unitOfWork.OrderRepository.GetAsync(o => o.PaymentId == null && o.UserId.Equals(user.Id));
            var response = _unitOfWork.VnPayRepository.PaymentExecute(Request.Query);
            if (response.PaymentId == "0" || response.VnPayResponseCode != "00")
            {
                await _unitOfWork.OrderRepository.RemoveOrderAsync(order);
                await _unitOfWork.SaveAsync();
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Payment failed");
                return BadRequest(_response);
            }

            PaymentDTO payment = new PaymentDTO()
            {
                TransactionId = response.OrderId,
                PaymentMethod = response.PaymentMethod,
            };

            var model = _mapper.Map<Payment>(payment);
            await _unitOfWork.PaymentRepository.CreateAsync(model);
            DateTime now = DateTime.Now;

            TimeZoneInfo utcPlus7 = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");

            DateTime now7 = TimeZoneInfo.ConvertTime(now, utcPlus7);

            model.CreatedDate = now7;
            await _unitOfWork.SaveAsync();
            order.PaymentId = model.PaymentId;
            await _unitOfWork.OrderRepository.UpdateOrderAsync(order);

            await _unitOfWork.PaymentRepository.UpdateStatus(order, model, user);

            await _unitOfWork.SaveAsync();
            var emailTo = user.Email;
            var orderDTO = _mapper.Map<OrderDTO>(order);
            orderDTO.CartLines = _mapper.Map<List<CartLineDTO>>(order.CartLines);

            await _unitOfWork.EmailRepository.SendEmailOrderAsync(emailTo, orderDTO, payment);
            return Ok(response);
        }
        [HttpPost("momo")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateMomoPaymentUrl(PaymentInformationModel model)
        {
            try
            {
                var paymentUrl = await _unitOfWork.MomoRepository.CreateMomoPaymentAsync(model);
                if (!paymentUrl.Contains("http"))
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.Result = paymentUrl;
                    return BadRequest(_response);
                }
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = paymentUrl;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add(ex.Message);
                return BadRequest();
            }

        }
        [HttpGet("executepayMomo")]
        public async Task<IActionResult> PaymentExecuteMomo()
        {
            var user = _userManager.Users.First();
            var order = await _unitOfWork.OrderRepository.GetAsync(o => o.PaymentId == null && o.UserId.Equals(user.Id));
            var response = _unitOfWork.MomoRepository.PaymentExecute(HttpContext.Request.Query);
            if (response.Status == "" || response.Message == "Bad Request")
            {
                await _unitOfWork.OrderRepository.RemoveOrderAsync(order);
                await _unitOfWork.SaveAsync();
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Payment failed");
                return BadRequest(_response);
            }
            PaymentDTO payment = new PaymentDTO()
            {
                TransactionId = response.OrderId,
                PaymentMethod = "Momo"
            };
            var model = _mapper.Map<Payment>(payment);
            await _unitOfWork.PaymentRepository.CreateAsync(model);
            await _unitOfWork.SaveAsync();
            order.PaymentId = model.PaymentId;
            await _unitOfWork.OrderRepository.UpdateOrderAsync(order);

            await _unitOfWork.PaymentRepository.UpdateStatus(order, model, user);
           
            await _unitOfWork.SaveAsync();
            var emailTo = user.Email;
            var orderDTO = _mapper.Map<OrderDTO>(order);
            orderDTO.CartLines = _mapper.Map<List<CartLineDTO>>(order.CartLines);

            await _unitOfWork.EmailRepository.SendEmailOrderAsync(emailTo, orderDTO, payment);
            return Ok(response);
        }
        [HttpPost("PayPal")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> CreatePaypalPaymentUrl(PaymentInformationModel model)
        {
            try
            {
                var paymentUrl = await _unitOfWork.PayPalRepository.CreatePaymentUrl(model);
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = paymentUrl;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add(ex.Message);
                return BadRequest();
            }

        }
        [HttpGet("executepayPayPal")]
        [AllowAnonymous]
        public async Task<IActionResult> PaymentExecutePayPal()
        {
            var order = _db.Orders.OrderBy(o => o.OrderDate).LastOrDefault();
            var user = _userManager.Users.FirstOrDefault(u => u.Id == order.UserId);
            
             //= await _unitOfWork.OrderRepository.GetAsync(o => o.PaymentId == null && o.UserId.Equals(user.Id));
            var response = _unitOfWork.PayPalRepository.PaymentExecute(HttpContext.Request.Query);
            if (!response.Success)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Payment failed");
                return BadRequest(_response);
            }

            PaymentDTO payment = new PaymentDTO()
            {
                TransactionId = response.OrderId,
                PaymentMethod = "PayPal"
            };
            var model = _mapper.Map<Payment>(payment);

            DateTime now = DateTime.Now;

            TimeZoneInfo utcPlus7 = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");

            DateTime now7 = TimeZoneInfo.ConvertTime(now, utcPlus7);

            model.CreatedDate = now7;

            await _unitOfWork.PaymentRepository.CreateAsync(model);

            await _unitOfWork.SaveAsync();

            order.PaymentId = model.PaymentId;

            order.Status = "Ordered";

            order.UpdateDate = now7;

            await _unitOfWork.OrderRepository.UpdateOrderAsync(order);

            await _unitOfWork.PaymentRepository.UpdateStatus(order, model, user);
          
            await _unitOfWork.SaveAsync();

            var emailTo = user.Email;
            var orderDTO = _mapper.Map<OrderDTO>(order);
            orderDTO.CartLines = _mapper.Map<List<CartLineDTO>>(order.CartLines);

            await _unitOfWork.EmailRepository.SendEmailOrderAsync(emailTo,orderDTO,payment);

            return Redirect("http://localhost:5173/successful-payment");
        }
    }
}
