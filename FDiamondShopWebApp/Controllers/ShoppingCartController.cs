using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace FDiamondShop.API.Controllers
{
    [Route("api/ShoppingCart")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        private readonly APIResponse _response;
        private readonly FDiamondContext _db;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public ShoppingCartController(FDiamondContext db, IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            this._response = new();
            _unitOfWork = unitOfWork;
            _db = db;
            _userManager = userManager;
            _mapper = mapper;
        }
        [HttpPost("CreateCart")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<APIResponse>> CreateCart( string Username,[FromBody]List <CartLineItemCreateDTO> model)
        {


            var user = _userManager.Users.First(u => u.UserName == Username);

            CartLineDTO cartLineDTO = new()
            {
                UserId = user.Id,
                User = user
            };
            
                var cartLine = _mapper.Map<CartLine>(cartLineDTO);
            await _unitOfWork.CartRepository.CreateAsync(cartLine);
            await _unitOfWork.SaveAsync();
            foreach (var item in model)
            {
                var product = await _db.Products.FindAsync(item.ProductId);

                decimal price = product.BasePrice;

                var cartLineItem = new CartLineItem
                {
                    CartLineId = cartLine.CartLineId,
                    ProductId = item.ProductId,
                    RingSize = item.RingSize,
                    Price = price
                };
                await _unitOfWork.CartRepository.CreateCartlineItem(cartLineItem);
            }


            await _unitOfWork.SaveAsync();
            _response.StatusCode = HttpStatusCode.Created;
            _response.IsSuccess = true;

            return CreatedAtAction("CreateCart", new { userId = user.Id }, _response);

        }
        //[HttpPost("AddItemToCartLineItem")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public async Task<IActionResult> AddProductToCartLineItem(int cartLineId, [FromBody] CartLineItemCreateDTO model)
        //{
        //    var product = await _db.Products.FindAsync(model.ProductId);
        //    decimal price = product.BasePrice;
        //    var cartLineItem = new CartLineItem
        //    {
        //        CartLineId = cartLineId,
        //        ProductId = model.ProductId,
        //        RingSize = model.RingSize,
        //        Price = price
        //    };

        //    _db.CartLineItems.Add(cartLineItem);
        //    _response.IsSuccess = true;
        //    _response.StatusCode= HttpStatusCode.OK;
        //    await _db.SaveChangesAsync();

        //    return Ok(_response);
        //}
        [HttpGet("GetAllCartLines")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllCartLines(string userName)
        {
            var user = await _db.Users.SingleOrDefaultAsync(u => u.UserName == userName);
            var cartLines = await _db.CartLines
                                          .Include(cl => cl.CartLineItems)
                                          .Where(cl => cl.UserId == user.Id)
                                          .ToListAsync();

            var cartLineDTOs = cartLines.Select(cl => new CartLineDTO
            {
                OrderId = cl.OrderId,
                UserId = cl.UserId,
                IsOrdered = cl.IsOrdered,
                CartLineItems = cl.CartLineItems.Select(cli => new CartLineItemDTO
                {
                    ProductId = cli.ProductId,
                    RingSize = cli.RingSize,
                    Price = cli.Price
                }).ToList()
            }).ToList();
            if(cartLineDTOs == null)
            {
                _response.IsSuccess = false;
                _response.StatusCode=HttpStatusCode.NotFound;
                _response.ErrorMessages.Add("Empty Cart here !");
                return NotFound();
            }
            _response.IsSuccess = true;
            _response.StatusCode= HttpStatusCode.OK;
            _response.Result = cartLineDTOs;
            return Ok(_response);
        }

        [HttpDelete("RemoveCartLine")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]    
        
        public async Task<IActionResult> RemoveCartLine(int cartLineId)
        {
            
            var cartLine = await _db.CartLines.FindAsync(cartLineId);
            var cartLineItems = await _db.CartLineItems.Where(cli => cli.CartLineId == cartLineId).ToListAsync();
            await _unitOfWork.CartRepository.RemoveRange(cartLineItems);
            await _unitOfWork.CartRepository.RemoveAsync(cartLine);
            await _unitOfWork.SaveAsync();
            

            return NoContent();
        }
        [HttpDelete("RemoveCartLineItem")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> RemoveCartLineItem(int cartLineId,int ProductId)
        {
            var cartLine = await _db.CartLines.FindAsync(cartLineId);
            var cartLineItem = await _db.CartLineItems.Where(cli=>cli.CartLineId==cartLineId && cli.ProductId==ProductId).ToListAsync();

            await _unitOfWork.CartRepository.RemoveRange(cartLineItem);
            await _unitOfWork.SaveAsync();
            
            return NoContent();
        }
    }
}
