using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Helper;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Net;

namespace FDiamondShop.API.Controllers
{
    [Route("api/checkout")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly APIResponse _response;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly FDiamondContext _db;
        public PaymentController(IUnitOfWork unitOfWork,IMapper mapper,UserManager<ApplicationUser> userManager,FDiamondContext db)
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
        public async Task <IActionResult> PaymentExecute()
        {
            var user = _userManager.Users.First();
            var order = await _unitOfWork.OrderRepository.GetAsync(o => o.PaymentId == null && o.UserId.Equals(user.Id));
            var response = _unitOfWork.VnPayRepository.PaymentExecute(Request.Query);
            if(response.PaymentId == "0")
            {
                await _unitOfWork.OrderRepository.RemoveOrderAsync(order);
                await _unitOfWork.SaveAsync();
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Payment failed");
                return BadRequest(_response);
            }
            
            PaymentDTO payment = new PaymentDTO()
            {
               TransactionId  = response.OrderId,              
               PaymentMethod=response.PaymentMethod,             
            };

            var model=_mapper.Map<Payment>(payment);
            await _unitOfWork.PaymentRepository.CreateAsync(model);
            await _unitOfWork.SaveAsync();
            order.PaymentId = model.PaymentId;
            await _unitOfWork.OrderRepository.UpdateOrderAsync(order);
            var cartLineupdate = _db.CartLines.Where(cartLineupdate => cartLineupdate.UserId.Equals(user.Id)
            && cartLineupdate.IsOrdered == false).ToList();
            foreach (var line in cartLineupdate)
            {
                line.OrderId = order.OrderId;
                line.IsOrdered = true;
                var cartlineItems = _db.CartLineItems.Where(cartlineItems => cartlineItems.CartLineId == line.CartLineId).ToList();
                foreach (var item in cartlineItems)
                {
                    var product = _db.Products.Where(product=>product.ProductId == item.ProductId).FirstOrDefault();
                    product.Quantity--;
                    if (product.Quantity == 0)
                    {
                        product.IsVisible = false;
                    }
                }
            }
            await _unitOfWork.SaveAsync();
            return Ok(response);
        }
        [HttpPost("momo")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> CreateMomoPaymentUrl(PaymentInformationModel model)
        {
            try
            {
                var paymentUrl =await _unitOfWork.MomoRepository.CreateMomoPaymentAsync(model);
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
        public async Task <IActionResult> PaymentExecuteMomo()
        {
            var user = _userManager.Users.First();
            var order = await _unitOfWork.OrderRepository.GetAsync(o => o.PaymentId == null && o.UserId.Equals(user.Id));
            var response =_unitOfWork.MomoRepository.PaymentExecute(HttpContext.Request.Query);
            if (response.OrderId == "0")
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
                PaymentMethod="Momo"               
            };
            var model = _mapper.Map<Payment>(payment);
            await _unitOfWork.PaymentRepository.CreateAsync(model);
            await _unitOfWork.SaveAsync();
            order.PaymentId = model.PaymentId;
            await _unitOfWork.OrderRepository.UpdateOrderAsync(order);
            var cartLineupdate = _db.CartLines.Where(cartLineupdate => cartLineupdate.UserId.Equals(user.Id)
            && cartLineupdate.IsOrdered == false).ToList();
            foreach (var line in cartLineupdate)
            {
                line.OrderId = order.OrderId;
                line.IsOrdered = true;
                var cartlineItems = _db.CartLineItems.Where(cartlineItems => cartlineItems.CartLineId == line.CartLineId).ToList();
                foreach (var item in cartlineItems)
                {
                    var product = _db.Products.Where(product => product.ProductId == item.ProductId).FirstOrDefault();
                    product.Quantity--;
                    if (product.Quantity == 0)
                    {
                        product.IsVisible = false;
                    }
                }
            }
            await _unitOfWork.SaveAsync();
            return Ok(response);
        }
        [HttpPost("PayPal")]
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
        public async Task< IActionResult> PaymentExecutePayPal()
        {
            var user = _userManager.Users.First();
            var order = await _unitOfWork.OrderRepository.GetAsync(o => o.PaymentId == null && o.UserId.Equals(user.Id));
            var response = _unitOfWork.PayPalRepository.PaymentExecute(HttpContext.Request.Query);
            if (response.OrderId == "0")
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
                PaymentMethod = "PayPal"
            };
            var model = _mapper.Map<Payment>(payment);
            await _unitOfWork.PaymentRepository.CreateAsync(model);
            await _unitOfWork.SaveAsync();
            order.PaymentId = model.PaymentId;
            await _unitOfWork.OrderRepository.UpdateOrderAsync(order);
            var cartLineupdate = _db.CartLines.Where(cartLineupdate => cartLineupdate.UserId.Equals(user.Id)
            && cartLineupdate.IsOrdered == false).ToList();
            foreach (var line in cartLineupdate)
            {
                line.OrderId = order.OrderId;
                line.IsOrdered = true;
                var cartlineItems = _db.CartLineItems.Where(cartlineItems => cartlineItems.CartLineId == line.CartLineId).ToList();
                foreach (var item in cartlineItems)
                {
                    var product = _db.Products.Where(product => product.ProductId == item.ProductId).FirstOrDefault();
                    product.Quantity--;
                    if(product.Quantity==0)
                    {
                        product.IsVisible = false;
                    }
                }
            }
            await _unitOfWork.SaveAsync();
            return Ok(response);
        }
    }
}
