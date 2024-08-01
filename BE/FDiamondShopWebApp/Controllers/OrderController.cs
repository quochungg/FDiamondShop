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
        private static bool _transactionInProgress = false;
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

        //[HttpPost("PreOrder")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //public async Task<ActionResult<APIResponse>> PreOrder(int orderId)
        //{
        //    var order = await _unitOfWork.OrderRepository.GetAsync(o => o.OrderId == orderId, includeProperties: "Cartlines.CartLineItems.Products");
        //    if (order == null)
        //    {
        //        _response.StatusCode = HttpStatusCode.NotFound;
        //        _response.IsSuccess = false;
        //        _response.ErrorMessages = new List<string> { "Order not found" };
        //        return NotFound(_response);
        //    }
        //}

        [HttpPost(Name = "CreateOrder")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> CreateOrder([FromBody] OrderCreateDTO createDTO)
        {
            int retryCount = 0;
            int maxRetries = 3; // Define the maximum number of retries

            while (_transactionInProgress && retryCount < maxRetries)
            {
                await Task.Delay(2000); // Wait for 2 seconds
                retryCount++;
            }

            if (_transactionInProgress)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "A transaction is already in process. Please try again later." };
                return BadRequest(_response);
            }
            List<Product> products = new();
            using (var transaction = await _unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    _transactionInProgress = true;
                    decimal totalPrice = 0;
                    var user = _userManager.Users.First(u => u.UserName == createDTO.UserName);
                    var cartLines = await _unitOfWork.CartRepository.GetAllCartlineExist(user);
                    await _unitOfWork.CartRepository.ValidCartLine(user.Id);
                    if (!cartLines.Any())
                    {
                        _response.StatusCode = HttpStatusCode.NotFound;
                        _response.IsSuccess = false;
                        _response.ErrorMessages = new List<string> { "Cart is empty" };
                        return NotFound(_response);
                    }

                    totalPrice = cartLines.SelectMany(cartLine => cartLine.CartLineItems)
                                          .Sum(cartLineItem => cartLineItem.Product.BasePrice);

                    DateTime now = DateTime.Now;
                    TimeZoneInfo utcPlus7 = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
                    DateTime now7 = TimeZoneInfo.ConvertTime(now, utcPlus7);

                    OrderDTO orderDTO = new()
                    {
                        BasePrice = totalPrice,
                        TotalPrice = totalPrice,
                        OrderDate = now7,
                        Status = createDTO.Status,                                          
                    };                                                          
                    if (!string.IsNullOrEmpty(createDTO.DiscountName))
                    {
                        var discount = _unitOfWork.DiscountCodeRepository.FindinOrder(createDTO);

                        if (discount == null)
                        {
                            return NotFound("Discount code not found");
                        }

                        orderDTO.DiscountCodeId = discount.DiscountId;
                        orderDTO.TotalPrice -= (orderDTO.TotalPrice * discount.DiscountPercent / 100);
                    }

                    var order = _mapper.Map<Order>(orderDTO);
                    order.Status = "Pending";
                    order.UserId = user.Id;
                    order.CartLines = cartLines;

                    foreach (var cartLine in cartLines)
                    {
                        cartLine.IsOrdered = true;
                        foreach (var cartLineItem in cartLine.CartLineItems)
                        {
                            var product = await _unitOfWork.ProductRepository.GetProductForUpdateAsync(cartLineItem.ProductId);
                            if (product.Quantity < 1)
                            {
                                _transactionInProgress = false;
                                await transaction.RollbackAsync();
                                _response.StatusCode = HttpStatusCode.BadRequest;
                                _response.IsSuccess = false;
                                _response.ErrorMessages = new List<string> { $"Product {cartLineItem.Product.ProductName} is out of stock." };
                                return BadRequest(_response);
                            }
                            if (!(product.SubCategoryId > 13 && product.SubCategoryId < 20))
                            {
                                product.Quantity -= 1;
                            }
                            if (product.Quantity == 0)
                            {
                                product.IsVisible = false;
                            }
                            _unitOfWork.ProductRepository.Update(product);
                            cartLineItem.Price = product.BasePrice;
                        }
                    }

                    await _unitOfWork.OrderRepository.CreateAsync(order);
                    await _unitOfWork.SaveAsync();
                    //await _unitOfWork.PaymentRepository.UpdateStatus(order, user);

                    var paymentInfo = new PaymentInformationModel
                    {
                        Amount = orderDTO.TotalPrice,
                        Name = user.UserName,
                        OrderDescription = "Thanh toan don hang",
                        OrderID = "",
                        OrderType = createDTO.PaymentMethod,                      
                    };

                    var deliveryDetail = new DeliveryDetail
                    {
                        Address = createDTO.Address,
                        Phone = createDTO.Phone,
                        FirstName = createDTO.FirstName,
                        LastName = createDTO.LastName,
                        Note = createDTO.Note
                        
                    };
                    if (string.IsNullOrEmpty(createDTO.Address))
                    {
                        deliveryDetail.Address = user.Address;
                    }
                    if (string.IsNullOrEmpty(createDTO.Phone))
                    {
                        deliveryDetail.Phone = user.PhoneNumber;
                    }
                    if (string.IsNullOrEmpty(createDTO.FirstName))
                    {
                        deliveryDetail.FirstName = user.FirstName;
                    }
                    if (string.IsNullOrEmpty(createDTO.LastName))
                    {
                        deliveryDetail.LastName = user.LastName;
                    }                  
                    await _unitOfWork.DeliveryRepository.CreateAsync(deliveryDetail);

                    order.DeliveryDetailId = deliveryDetail.DeliveryDetailId;
                    order.DeliveryDetail = deliveryDetail;

                    await _unitOfWork.SaveAsync();

                    switch (paymentInfo.OrderType.ToLower())
                    {
                        case "vnpay":
                            decimal amountVNPay = await _unitOfWork.ExchangeRepository.ExchangeMoneyToVND(order.TotalPrice, "USD");
                            paymentInfo.Amount = (int)amountVNPay;

                            var paymentApiUrlVNPay = new Uri(new Uri("https://localhost:7074"), "/api/checkout/vnpay");
                            var paymentResponseVNPay = await _httpClient.PostAsJsonAsync(paymentApiUrlVNPay, paymentInfo);
                            if (paymentResponseVNPay.IsSuccessStatusCode)
                            {
                                var paymentResultVNPay = await paymentResponseVNPay.Content.ReadFromJsonAsync<APIResponse>();
                                if (paymentResultVNPay.IsSuccess)
                                {
                                    _response.Result = new { PaymentUrl = paymentResultVNPay.Result.ToString() };
                                }
                                else
                                {
                                    _transactionInProgress = false;
                                    await _unitOfWork.OrderRepository.RemoveOrderAsync(order);
                                    await _unitOfWork.SaveAsync();
                                    _response.StatusCode = HttpStatusCode.BadRequest;
                                    _response.IsSuccess = false;
                                    _response.ErrorMessages = paymentResultVNPay.ErrorMessages;
                                    return BadRequest(_response);
                                }
                            }
                            break;

                        case "momo":
                            decimal amountMoMo = await _unitOfWork.ExchangeRepository.ExchangeMoneyToVND(order.TotalPrice, "USD");
                            paymentInfo.Amount = (int)amountMoMo;

                            var paymentApiUrlMoMo = new Uri(new Uri("https://fdiamond-api.azurewebsites.net"), "/api/checkout/momo");
                            var paymentResponseMoMo = await _httpClient.PostAsJsonAsync(paymentApiUrlMoMo, paymentInfo);
                            if (paymentResponseMoMo.IsSuccessStatusCode)
                            {
                                var paymentResultMoMo = await paymentResponseMoMo.Content.ReadFromJsonAsync<APIResponse>();
                                if (paymentResultMoMo.IsSuccess)
                                {
                                    _response.Result = new { PaymentUrl = paymentResultMoMo.Result.ToString() };
                                }
                                else
                                {
                                    _transactionInProgress = false;
                                    await _unitOfWork.OrderRepository.RemoveOrderAsync(order);
                                    await _unitOfWork.SaveAsync();
                                    _response.StatusCode = HttpStatusCode.BadRequest;
                                    _response.IsSuccess = false;
                                    _response.ErrorMessages = paymentResultMoMo.ErrorMessages;
                                    return BadRequest(_response);
                                }
                            }
                            else
                            {
                                await _unitOfWork.OrderRepository.RemoveOrderAsync(order);
                                await _unitOfWork.SaveAsync();
                                return BadRequest(paymentResponseMoMo.Content.ToString());
                            }
                            break;

                        case "paypal":
                            paymentInfo.Amount = orderDTO.TotalPrice;
                            paymentInfo.OrderID = order.OrderId.ToString();

                            var paymentApiUrlPaypal = new Uri(new Uri("https://fdiamond-api.azurewebsites.net"), "/api/checkout/PayPal");
                            var paymentResponsePaypal = await _httpClient.PostAsJsonAsync(paymentApiUrlPaypal, paymentInfo);

                            if (paymentResponsePaypal.IsSuccessStatusCode)
                            {
                                var paymentResultPaypal = await paymentResponsePaypal.Content.ReadFromJsonAsync<APIResponse>();
                                if (paymentResultPaypal.IsSuccess)
                                {
                                    _response.Result = new { PaymentUrl = paymentResultPaypal.Result.ToString() };
                                    
                                    order.PaymentURL = paymentResultPaypal.Result.ToString();
                                    await _unitOfWork.OrderRepository.UpdateOrderAsync(order);
                                    await _unitOfWork.SaveAsync();
                                }
                                else
                                {
                                    _transactionInProgress = false;
                                    await _unitOfWork.OrderRepository.RemoveOrderAsync(order);
                                    await _unitOfWork.SaveAsync();
                                    _response.StatusCode = HttpStatusCode.BadRequest;
                                    _response.IsSuccess = false;
                                    _response.ErrorMessages = paymentResultPaypal.ErrorMessages;
                                    return BadRequest(_response);
                                }
                            }
                            break;
                    }
                    _transactionInProgress = false;
                    await _unitOfWork.SaveAsync();
                    await transaction.CommitAsync();
                    _response.IsSuccess = true;
                    _response.StatusCode = HttpStatusCode.OK;
                    return Ok(_response);
                }
                catch (Exception ex)
                {
                    _transactionInProgress = false;
                    await transaction.RollbackAsync();
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages = new List<string> { ex.ToString() };
                    return BadRequest(_response);
                }
            }
        }

        [HttpPost("CancelPendingOrders")]
        public async Task<ActionResult<APIResponse>> CancelPendingOrders()
        {
            try
            {
                TimeZoneInfo vietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
                DateTime vietnamNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, vietnamTimeZone);
                DateTime cutoffTime = vietnamNow.AddMinutes(-5);

                var pendingOrders = await _unitOfWork.OrderRepository.GetPendingOrdersOlderThan(cutoffTime);

                if (pendingOrders == null || !pendingOrders.Any())
                {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    _response.ErrorMessages = new List<string> { "No pending orders found to cancel." };
                    return NotFound(_response);
                }

                foreach (var order in pendingOrders)
                {

                    await _unitOfWork.OrderRepository.RollBackOrder(order.OrderId);
                    await _unitOfWork.SaveAsync();
                }

                await _unitOfWork.SaveAsync();
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = new { Message = "Pending orders cancelled successfully." };
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
            if (orders == null)
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
            if (orderDTO.Status == "Delivered")
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "Order has been delivered" };
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
            var orders = await _unitOfWork.OrderRepository.GetAllAsync(includeProperties: "CartLines.CartLineItems.Product.SubCategory.Category,DiscountCode,Payment");
            
            if (orders == null)
            {
                
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.ErrorMessages.Add("EMPTY");
                return Ok(_response);
            }
            var returnOrder = _mapper.Map<List<OrderDTO>>(orders);
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = returnOrder;
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

        [HttpPut("RePurchase/{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> RePurcharge(int id)
        {
            try
            {
                await _unitOfWork.OrderRepository.RePurchase(id);
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

        [HttpGet("GetOrderMinor")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetOrderMinor()
        {
            var orders = await _unitOfWork.OrderRepository.GetAllAsync(includeProperties: "Payment");
            if (orders == null)
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

        [HttpPost("AssignToOrderManagementStaff")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> AssignToOrderManagementStaff([FromBody] AssignCreateDTO createDTO)
        {
            try
            {
                var ordermanagementstaff = _userManager.Users.FirstOrDefault(us => us.Id == createDTO.UserId);


                var order = _unitOfWork.OrderRepository.GetOrderbyId(createDTO.OrderId);
                if (!order.Status.Equals("Ordered") && order.OrderManagementStaffId != null)
                {
                    _response.ErrorMessages = new List<string> { "CAN NOT ASSIGN THE ORDER THAT ASSIGNED" };
                    return BadRequest(_response);

                }
                order.OrderManagementStaffId = ordermanagementstaff.Id;
                order.Status = "Preparing";
                order.UpdateDate = DateTime.Now;
                await _unitOfWork.SaveAsync();
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

        [HttpGet("GetAllOrderForOrderManagementStaff")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllOrderForOrderManagementStaff(string id)
        {
            var orders = await _unitOfWork.OrderRepository.GetAllOrderForOrderManagement(id);
            if (orders.Count() == 0)
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

        [HttpGet("GetWarranty")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetWarranty(int orderId)
        {
            var warranty = await _unitOfWork.WarrantyRepository.GetAsync(w => w.OrderId == orderId, tracked: false);
            if (warranty == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = true;
                _response.ErrorMessages = new List<string> { "Warranty not found" };
                return NotFound(_response);
            }
            return File(warranty.WarrantyPDF, "application/pdf", $"warranty{orderId}.pdf");
        }

        [HttpGet("GetPaypalLink")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPaypalLink(int orderId)
        {
            var order = await _unitOfWork.OrderRepository.GetAsync(o => o.OrderId == orderId);
            if (order == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "Order not found" };
                return NotFound(_response);
            }
            _response.IsSuccess = true;
            _response.StatusCode = HttpStatusCode.OK;
            _response.Result = order.PaymentURL;
            return Ok(_response);
        }
    }
}