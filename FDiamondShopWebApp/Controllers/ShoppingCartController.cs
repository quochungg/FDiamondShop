using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        
        public ShoppingCartController(FDiamondContext db,IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager)
        {
            this._response= new();
            _unitOfWork=unitOfWork;            
            _db=db;
            _userManager=userManager;
        }
        [HttpPost("CreateCart")]
        public async Task <ActionResult<ShoppingCart>> CreateCart()
        {
            var user= await _userManager.GetUserAsync(User);
            if (user == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { $"User was not found." };
                return NotFound(_response);
            }
            var cart=new ShoppingCart {UserId=user.Id};
            await _unitOfWork.ShoppingCartRepository.CreateAsync(cart);
            _response.StatusCode = HttpStatusCode.NoContent;
            _response.IsSuccess = true;
            return CreatedAtAction("CreateCart", new { userId = user.Id }, cart);
        }
        [HttpPost("{cartId}/items")]
        public async Task<ActionResult<CartItem>> AddItem(int cartId, [FromBody] CartItem cartItem)
        {
            var item = await _unitOfWork.ShoppingCartRepository.AddItemToCartAsync(cartId, cartItem);
            return CreatedAtAction("GetCart", new { userId = cartItem.CartId }, item);
        }

        
    }
}
