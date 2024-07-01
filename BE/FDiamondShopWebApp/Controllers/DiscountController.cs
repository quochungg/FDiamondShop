using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace FDiamondShop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private readonly APIResponse _response;
        private readonly FDiamondContext _db;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public DiscountController(IUnitOfWork unitOfWork, FDiamondContext db, IMapper mapper)
        {
            this._response = new();
            _unitOfWork = unitOfWork;
            _db = db;
            _mapper = mapper;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> GetAllDiscounCode([FromQuery] string? discountcode, [FromQuery] bool? isexpried)
        {
            IEnumerable<DiscountCode> DiscountList = await _unitOfWork.DiscountCodeRepository.GetAllAsync();
            if (discountcode != null)
            {
                DiscountList = DiscountList.Where(u => u.DiscountCodeName.Equals(discountcode));
            }
            if (isexpried != null)
            {
                DiscountList = DiscountList.Where(u => u.IsExpried == isexpried);
            }
            try
            {

                var model = _mapper.Map<List<DiscountCodeDTO>>(DiscountList);
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = model;
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

        [HttpPost(Name = "CreateDiscountCode")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> CreateDiscountCode([FromBody] DiscountCodeCreateDTO createDTO)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest("ModelState");
            }
            try
            {
                var discount = _mapper.Map<DiscountCode>(createDTO);
                var recent = _unitOfWork.DiscountCodeRepository.GetAsync(dc=>dc.DiscountCodeName.Equals(createDTO.DiscountCodeName));
                if (recent != null)
                {
                    _response.IsSuccess = false;
                    return BadRequest("Dublicate Code is not required");
                }
                else
                {
                    await _unitOfWork.DiscountCodeRepository.CreateAsync(discount);
                    await _unitOfWork.SaveAsync();
                    _response.Result = _mapper.Map<DiscountCodeDTO>(discount);
                    _response.StatusCode = HttpStatusCode.Created;
                }
               
                //return CreatedAtRoute("GetProductById", new { id = discount.DiscountId }, _response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
            }
            return _response;
        }



        [HttpPut("{id:int}", Name = "UpdateDiscountCodeStatus")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> UpdateDiscountCodeStatus(int id, [FromBody] DiscountCodeUpdateDTO updateDTO)
        {
            try
            {
                var discount =  await _db.DiscountCodes.FirstOrDefaultAsync(u => u.DiscountId== id);

                var now = DateTime.Now;
                TimeZoneInfo utcPlus7 = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
                DateTime now7 = TimeZoneInfo.ConvertTime(now, utcPlus7);
                if (discount == null)
                {
                    return NotFound("DiscountCode not found");
                }
                discount.DiscountPercent = updateDTO.DiscountPercent;
                discount.StartingDate = DateTime.Parse(updateDTO.StartingDate);
                discount.EndDate = DateTime.Parse(updateDTO.EndDate);
                discount.IsExpried = now7 < discount.StartingDate || now7 > discount.EndDate;

                await _unitOfWork.SaveAsync();
                _response.StatusCode = HttpStatusCode.NoContent;
                _response.IsSuccess = true;
                return NoContent();
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
            }

            return _response;  
        }
        [HttpPut("UpdateAuto", Name = "UpdateAuto")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> UpdateAuto()
        {
            try
            {
                var existDiscount = await _unitOfWork.DiscountCodeRepository.GetAllAsync();
                var now = DateTime.Now;
                TimeZoneInfo utcPlus7 = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
                DateTime now7 = TimeZoneInfo.ConvertTime(now, utcPlus7);
                foreach (var discount in existDiscount)
                {
                    discount.IsExpried = now7 < discount.StartingDate || now7 > discount.EndDate;
                    await _unitOfWork.SaveAsync();
                }
                
                _response.StatusCode = HttpStatusCode.NoContent;
                _response.IsSuccess = true;
                return NoContent();

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
                return BadRequest(_response);
            }
        }
    }
}
