using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Models;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Repository.IRepository;
using System.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using FDiamondShop.API.Helper;

namespace FDiamondShop.API.Controllers
{
    [Route("api/Order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly APIResponse _response;
        private readonly FDiamondContext _db;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly HttpClient _httpClient;
        public OrderController(IUnitOfWork unitOfWork, FDiamondContext db, IMapper mapper,
            UserManager<ApplicationUser> userManager, HttpClient httpClient)
        {
            this._response = new();
            _unitOfWork = unitOfWork;
            _db = db;
            _mapper = mapper;
            _userManager = userManager;
            _httpClient = httpClient;
        }
        
        [HttpPost(Name = "CreateOrder")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> CreateOrder( [FromBody] OrderCreateDTO createDTO)
        {
            List<Product> products = new();
            try
            {
                decimal totalPrice = 0;
                var user = _userManager.Users.First(u => u.UserName == createDTO.UserName);
                var cartLines = await _unitOfWork.CartRepository.GetAllCartlineExist(user);
                if (cartLines.Count()==0)
                {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    _response.ErrorMessages = new List<string> { "Cart is empty" };
                    return NotFound(_response);
                }
                    totalPrice = cartLines.SelectMany(cartLine => cartLine.CartLineItems)
                      .Sum(cartLineItem => cartLineItem.Price);
                DateTime now = DateTime.Now;
                TimeZoneInfo utcPlus7 = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
                DateTime now7 = TimeZoneInfo.ConvertTime(now, utcPlus7);
                OrderDTO orderDTO = new()
                {
                    BasePrice = totalPrice,
                    TotalPrice = totalPrice,
                    OrderDate= now7,
                    Status = createDTO.Status
                };
                if (createDTO.DiscountName!=null)
                {
                    var discount = _unitOfWork.DiscountCodeRepository.FindinOrder(createDTO);

                    if (discount == null)
                    {
                        
                        return NotFound("Discount code not found");
                    }
                    if (discount != null)
                    {
                        orderDTO.DiscountCodeId = discount.DiscountId;
                        orderDTO.TotalPrice -= (orderDTO.TotalPrice * discount.DiscountPercent / 100);      
                    }                  
                }

                var order = _mapper.Map<Order>(orderDTO);
                order.Status = "Pending";
                order.UserId = user.Id;
                await _unitOfWork.OrderRepository.CreateAsync(order);
                await _unitOfWork.SaveAsync();               
                _response.Result = _mapper.Map<OrderDTO>(order);
                _response.StatusCode = HttpStatusCode.Created;
                var paymentInfo = new PaymentInformationModel
                {
                    Amount = orderDTO.TotalPrice,
                    Name = user.UserName,
                    OrderDescription = "Thanh toan don hang",
                    OrderID = "",
                    OrderType = createDTO.PaymentMethod,

                };
                
                switch (paymentInfo.OrderType.ToLower())
                {
                   
                    case "vnpay":
                        decimal amount = await _unitOfWork.ExchangeRepository.ExchangeMoneyToVND(order.TotalPrice, "USD");
                        paymentInfo.Amount = (int)amount;
                        //sua link tren swagger
                        var paymentApiUrl = new Uri(new Uri("https://fdiamond-api.azurewebsites.net"), "/api/checkout/vnpay");
                        var paymentResponse = await _httpClient.PostAsJsonAsync(paymentApiUrl, paymentInfo);
                        if (paymentResponse.IsSuccessStatusCode)
                        {
                            var paymentResult = await paymentResponse.Content.ReadFromJsonAsync<APIResponse>();
                            if (paymentResult.IsSuccess)
                            {
                                _response.Result = new
                                {
                                    PaymentUrl = paymentResult.Result.ToString(),
                                };
                            }

                            else
                            {
                                await _unitOfWork.OrderRepository.RemoveOrderAsync(order);
                                await _unitOfWork.SaveAsync();
                                _response.StatusCode = HttpStatusCode.BadRequest;
                                _response.IsSuccess = false;
                                _response.ErrorMessages = paymentResult.ErrorMessages;
                                return BadRequest(_response);
                            }
                        }
                        break;
                    
                    case "momo":
                        decimal amountVND = await _unitOfWork.ExchangeRepository.ExchangeMoneyToVND(order.TotalPrice, "USD");
                        paymentInfo.Amount = (int)amountVND;
                        var paymentApiUrlMomo = new Uri(new Uri("https://fdiamond-api.azurewebsites.net"), "/api/checkout/momo");
                        var paymentResponseMomo = await _httpClient.PostAsJsonAsync(paymentApiUrlMomo, paymentInfo);
                        var respose = paymentResponseMomo.Content.ToString();
                        if (paymentResponseMomo.IsSuccessStatusCode)
                        {

                            var paymentResult = await paymentResponseMomo.Content.ReadFromJsonAsync<APIResponse>();
                            if (paymentResult.IsSuccess)
                            {
                                _response.Result = new
                                {
                                    PaymentUrl = paymentResult.Result.ToString(),
                                };
                            }

                            else
                            {
                                await _unitOfWork.OrderRepository.RemoveOrderAsync(order);
                                await _unitOfWork.SaveAsync();
                                _response.StatusCode = HttpStatusCode.BadRequest;
                                _response.IsSuccess = false;
                                _response.ErrorMessages = paymentResult.ErrorMessages;
                                return BadRequest(_response);
                            }
                        }
                        else
                        {
                            await _unitOfWork.OrderRepository.RemoveOrderAsync(order);
                            await _unitOfWork.SaveAsync();
                            return BadRequest(respose);
                        }
                        break;
                    case "paypal":
                         paymentInfo.Amount=orderDTO.TotalPrice;

                        var paymentApiUrlPaypal = new Uri(new Uri("https://localhost:7074/swagger"), "/api/checkout/PayPal");
                        var paymentResponsePaypal = await _httpClient.PostAsJsonAsync(paymentApiUrlPaypal, paymentInfo);

                        if (paymentResponsePaypal.IsSuccessStatusCode)
                        {

                            var paymentResult = await paymentResponsePaypal.Content.ReadFromJsonAsync<APIResponse>();
                            if (paymentResult.IsSuccess)
                            {
                                _response.Result = new
                                {
                                    PaymentUrl = paymentResult.Result.ToString(),
                                };
                            }

                            else
                            {
                                await _unitOfWork.OrderRepository.RemoveOrderAsync(order);
                                await _unitOfWork.SaveAsync();
                                _response.StatusCode = HttpStatusCode.BadRequest;
                                _response.IsSuccess = false;
                                _response.ErrorMessages = paymentResult.ErrorMessages;
                                return BadRequest(_response);
                            }
                        }
                        break;
                }

                await _unitOfWork.SaveAsync();
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
        [HttpGet("GetAllOrderByUserId")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllOrder(string UserId)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == UserId);
            if (user == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "User not found" };
                return NotFound(_response);
 
            }

            var orders = await _unitOfWork.OrderRepository.GetAllOrderAsync(user.Id);
            if(orders == null)
            {
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.ErrorMessages.Add("EMPTY");
                return Ok(_response);
            }
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = orders;
            return Ok(_response);
        }
        [HttpGet("GetOrderDetails")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetOrderDetails(int orderId)
        {
            var order = await _unitOfWork.OrderRepository.GetOrderDetails(orderId);
            if (order == null)
            {
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.ErrorMessages.Add("EMPTY");
                return Ok(_response);
            }
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = order;
            return Ok(_response);
        }

        [HttpPost("CancelOrder")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> CancelOrder(int orderId)
        {
            var orderDTO = await _unitOfWork.OrderRepository.GetOrderDetails(orderId);
            if (orderDTO == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "Order not found" };
                return NotFound(_response);
            }
            if (orderDTO.Status == "Completed")
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "Order has been completed" };
                return BadRequest(_response);
            }
            await _unitOfWork.OrderRepository.CancelOrder(orderId);
            var order = await _unitOfWork.OrderRepository.GetAsync(o => o.OrderId == orderId);
            var user = await _unitOfWork.UserRepository.GetAsync(u => u.Id == order.UserId);
            await _unitOfWork.EmailRepository.SendEmailCancelAsync(user.Email, user.LastName);
            await _unitOfWork.SaveAsync();
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            return Ok(_response);
        }
        
        [HttpGet("FilterOrder")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> FilterOrder(string userId, string? status, string? orderBy)
        {
            var orders = await _unitOfWork.OrderRepository.FilterOrder(userId, status, orderBy);
            if (orders == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("No Order Found");
                return Ok(_response);
            }
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = orders;
            return Ok(_response);
        }

        [HttpGet("GetAllOrder")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllOrder()
        {         
            var orders = await _unitOfWork.OrderRepository.GetAllAsync(includeProperties: "CartLines,CartLines.CartLineItems,CartLines.CartLineItems.Product,DiscountCode,Payment");
            if(orders == null)
            {
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.ErrorMessages.Add("EMPTY");
                return Ok(_response);
            }
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = orders;
            return Ok(_response);
        }

        [HttpPut("UpdateStatus/{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        
        public async Task<ActionResult<APIResponse>> UpdateStatus(int id)
        {
            try
            {
                await _unitOfWork.OrderRepository.CompleteOrder(id);      
                await _unitOfWork.SaveAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _response.ErrorMessages.Add($"{ex.Message}");
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.BadRequest;
                return BadRequest(_response);
            }
        }
    }
}