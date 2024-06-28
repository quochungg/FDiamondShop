using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;

namespace FDiamondShop.API.Controllers
{
    [Route("api/alo-hung")]
    [ApiController]
    public class AloHungController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly FDiamondContext _db;
        private readonly APIResponse _response;
        public AloHungController(IUnitOfWork unitOfWork, FDiamondContext db)
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
    }
}
