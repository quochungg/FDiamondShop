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
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> CreateOrder( [FromBody] OrderCreateDTO createDTO)
        {
            List<Product> products = new();
            try
            {
                decimal totalPrice = 0;
                var user = _userManager.Users.First(u => u.UserName == createDTO.UserName);
                var cartLines = await _unitOfWork.CartRepository.GetAllCartlineExist(user);

                if (cartLines.Count == 0)
                {
                    return NotFound();

                }
                foreach(var cl in cartLines)
                {
                    foreach (var item in cl.CartLineItems)
                    {
                        var product = await _unitOfWork.ProductRepository.GetAsync(p => p.ProductId == item.ProductId, includeProperties: "ProductImages,ProductVariantValues,SubCategory");
                        var category = await _unitOfWork.CategoryRepository.GetAsync(c => c.CategoryId == product.SubCategory.CategoryId);
                        if (category.CategoryId == 1)
                        {
                            products.Add(product);
                        }
                        if (category.CategoryId != 1)
                        {
                            var checkQuantity = cartLines.ToArray().SelectMany(cartLine => cartLine.CartLineItems)
                                .Where(cartLineItem => cartLineItem.ProductId == item.ProductId).Count();
                            var checkProductQuantity = product.Quantity;
                            if (checkQuantity > checkProductQuantity)
                            {
                                ProductCheck productCheck = new ProductCheck();
                                productCheck.ProductId = product.ProductId;
                                productCheck.Quantity = product.Quantity;
                                _response.StatusCode = HttpStatusCode.BadRequest;
                                _response.IsSuccess = false;
                                _response.ErrorMessages.Add("Out Of Quantity");
                                _response.Result = productCheck;
                                return BadRequest(_response);
                            }
                        }
                    }
                }
                var duplicateProducts = products.GroupBy(p => p.ProductId)
                                        .Where(g => g.Count() > 1).ToList();
                
                    if(duplicateProducts.Count()>0){
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.IsSuccess = false;
                        _response.ErrorMessages = new List<string> { "There have some duplicate Diamond" };
                    
                        return BadRequest(_response);
                        
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


                };
                if (createDTO.DiscountName!=null)
                {
                    var discount = _db.DiscountCodes.SingleOrDefault(u => u.DiscountCodeName == createDTO.DiscountName);

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
                order.UserId = user.Id;
                await _unitOfWork.OrderRepository.CreateAsync(order);
                await _unitOfWork.SaveAsync();               
                _response.Result = _mapper.Map<OrderDTO>(order);
                _response.StatusCode = HttpStatusCode.Created;
                var paymentInfo = new PaymentInformationModel
                {
                    Amount = await _unitOfWork.ExchangeRepository.ExchangeMoneyToVND(order.TotalPrice, "USD"),
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

                        var paymentApiUrlPaypal = new Uri(new Uri("https://fdiamond-api.azurewebsites.net"), "/api/checkout/PayPal");
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
        [HttpGet("GetAllOrder")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllOrder(string UserId)
        {
            var user = _userManager.Users.First(u => u.Id == UserId);
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
    }
}