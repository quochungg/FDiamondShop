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
using MailKit.Search;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

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
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> CreateOrder(string userName, [FromBody] OrderCreateDTO createDTO)
        {
            try
            {
                decimal totalPrice = 0;
                var user = _userManager.Users.First(u => u.UserName == userName);
                var cartLines = await _db.CartLines
                                          .Include(cl => cl.CartLineItems)
                                          .Where(cl => cl.UserId == user.Id && cl.IsOrdered == false)
                                          .Where(cl => cl.UserId == user.Id && cl.IsOrdered == false && cl.IsOrdered == false)
                                          .ToListAsync();
                if (cartLines.Count == 0)
                {
                    return NotFound();

                }
                foreach (var cartLine in cartLines)
                {

                    foreach (var cartLineItem in cartLine.CartLineItems)
                    {
                        var price = cartLineItem.Price;
                        totalPrice += price;
                    }

                }

                OrderDTO orderDTO = new()
                {
                    BasePrice = totalPrice,
                    TotalPrice = totalPrice,
                    UserId = user.Id

                };
                if (createDTO.DiscountName != null)
                {
                    var discount = _db.DiscountCodes.SingleOrDefault(u => u.DiscountCodeName == createDTO.DiscountName);
                    if (discount != null)
                    {
                        orderDTO.DiscountCodeId = discount.DiscountId;
                        orderDTO.TotalPrice -= (orderDTO.TotalPrice * discount.DiscountPercent / 100);                      
                    }
                }

                var order = _mapper.Map<Order>(orderDTO);
                await _unitOfWork.OrderRepository.CreateAsync(order);
                await _unitOfWork.SaveAsync();               
                _response.Result = _mapper.Map<OrderDTO>(order);
                _response.StatusCode = HttpStatusCode.Created;
                var paymentInfo = new PaymentInformationModel
                {
                    Amount = order.TotalPrice * 1000,
                    Name = user.UserName,
                    OrderDescription = "Thanh toan don hang",
                    OrderID = "string",
                    OrderType = createDTO.PaymentMethod,

                };
                
                switch (paymentInfo.OrderType.ToLower())
                {
                    
                    case "vnpay":

                        var paymentApiUrl = new Uri(new Uri("https://localhost:7074/swagger/index.html"), "/api/checkout/vnpay");
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
                        int amountVND = Convert.ToInt32(order.TotalPrice * 1000);
                        paymentInfo.Amount = amountVND;
                        var paymentApiUrlMomo = new Uri(new Uri("https://localhost:7074/swagger/index.html"), "/api/checkout/momo");
                        var paymentResponseMomo = await _httpClient.PostAsJsonAsync(paymentApiUrlMomo, paymentInfo);

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
                        break;
                    case "paypal":
                         amountVND = Convert.ToInt32(order.TotalPrice * 1000);
                        paymentInfo.Amount = amountVND;
                        var paymentApiUrlPaypal = new Uri(new Uri("https://localhost:7074/swagger/index.html"), "/api/checkout/PayPal");
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
    }
}