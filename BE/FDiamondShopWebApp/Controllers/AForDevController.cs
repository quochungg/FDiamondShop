using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;

namespace FDiamondShop.API.Controllers
{
    [Route("api/for-dev")]
    [ApiController]
    public class AForDevController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly FDiamondContext _db;
        private readonly APIResponse _response;
        public AForDevController(IUnitOfWork unitOfWork, FDiamondContext db)
        {
            _db = db;
            _unitOfWork = unitOfWork;
            _response = new();
        }

        [HttpDelete("delete-account")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteAccount()
        {
            try
            {
                _db.ApplicationUsers.RemoveRange(_db.ApplicationUsers);
                await _db.SaveChangesAsync();
            }catch(Exception ex)
            {
                _response.ErrorMessages.Add (ex.Message);
                return BadRequest(_response);
            }
            return NoContent();
        }

        [HttpDelete("delete-order")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteOrder()
        {
            _db.Orders.RemoveRange(_db.Orders);
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("delete-cartline")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteCartline()
        {
            _db.CartLines.RemoveRange(_db.CartLines);
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("reset-product-quantity")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> ResetProductQuantity()
        {
            var products = await _unitOfWork.ProductRepository.GetAllAsync(includeProperties: "SubCategory,SubCategory.Category");
            foreach (var product in products)
            {
                if( 1 <=  product.SubCategoryId && product.SubCategoryId <= 9)
                {
                    product.Quantity = 1;
                    product.IsVisible = true;
                    product.IsDeleted = false;
                }
                else
                {
                    product.Quantity = 1000;
                    product.IsVisible = true;
                    product.IsDeleted = false;
                }
            }
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("update-visibility-to-true/{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        //endpoint to update product's visibility
        public async Task<IActionResult> UpdateProductVisibilityToTrue(int id)
        {
            var product = await _unitOfWork.ProductRepository.GetAsync(u => u.ProductId == id);
            product.IsVisible = true;
            await _db.SaveChangesAsync();
            return NoContent();
        }
        [HttpPut("update-visibility-to-false/{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        //endpoint to update product's visibility
        public async Task<IActionResult> UpdateProductVisibilityToFalse(int id)
        {
            var product = await _unitOfWork.ProductRepository.GetAsync(u => u.ProductId == id);
            product.IsVisible = false;
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
