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
        public async Task<ActionResult<APIResponse>> CreateOrder(string userName, [FromBody] OrderDTO orderDTO)
        {
            try
            {
                decimal totalprice = 0;

                var user = _userManager.Users.First(u => u.UserName == userName);
                var cartline = _db.CartLines.Where(cl => cl.UserId == user.Id).ToList();
                foreach (var line in cartline)
                {
                    var cartitems = _db.CartLineItems.Where(i => i.CartLineId == line.CartLineId).ToList();
                    foreach (var item in cartitems)
                    {
                        totalprice += item.Price;
                    }
                }

                orderDTO = new()
                {
                    UserId = user.Id,
                    TotalPrice = totalprice,
                };
                var order = _mapper.Map<Order>(orderDTO);
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