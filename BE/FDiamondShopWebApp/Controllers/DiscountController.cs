using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Http.HttpResults;
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
        private readonly IHttpClientFactory _httpClientFactory;
        public DiscountController(IUnitOfWork unitOfWork, FDiamondContext db, IMapper mapper, IHttpClientFactory httpClientFactory)
        {
            this._response = new();
            _unitOfWork = unitOfWork;
            _db = db;
            _mapper = mapper;
            _httpClientFactory = httpClientFactory;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<APIResponse>> GetAllDiscounCode([FromQuery] string? discountcode, [FromQuery] bool? isexpried)
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.PutAsync("https://fdiamond-api.azurewebsites.net/api/discount/updateauto", null);
            if (!response.IsSuccessStatusCode)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "Cannot update discount code" };
                _response.StatusCode = HttpStatusCode.InternalServerError;
                return StatusCode(500, _response);
            }
            IEnumerable<DiscountCode> DiscountList = await _unitOfWork.DiscountCodeRepository.GetAllAsync();
            if(DiscountList == null)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "Discount Code Not Found" };
                _response.StatusCode = HttpStatusCode.NotFound;
                return StatusCode(404, _response);
            }
            if (discountcode != null)
            {
                DiscountList = DiscountList.Where(u => u.DiscountCodeName.ToLower().Equals(discountcode.ToLower()));
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

        [HttpGet(("GetDiscountCodeByCodeName"), Name = "GetDiscountCodeByCodeName")]
        public async Task<ActionResult<APIResponse>> GetDiscountCode(string discountCode)
        {
            var discount = await _unitOfWork.DiscountCodeRepository.GetAsync(d => d.DiscountCodeName.ToLower().Equals(discountCode.ToLower()));
            if (discount == null)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "Discount Code Not Found" };
                _response.StatusCode = HttpStatusCode.NotFound;
                return StatusCode(404, _response);
            }
            try
            {
                var model = _mapper.Map<DiscountCodeDTO>(discount);
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
                var now = DateTime.Now;
                TimeZoneInfo utcPlus7 = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
                DateTime now7 = TimeZoneInfo.ConvertTime(now, utcPlus7);
                var discount = _mapper.Map<DiscountCode>(createDTO);
                var recent = _unitOfWork.DiscountCodeRepository.CheckDuplicate(createDTO.DiscountCodeName);

                if (recent != null)
                {
                    return BadRequest("Dublicate Code is not required");
                }
                if (createDTO.DiscountPercent<0)
                {
                    return BadRequest("Percent must be the postive number");
                }
                //if (DateTime.Compare(now7, createDTO.StartingDate) > 0) //Ngay hien tai lon hon ngay start
                //{
                //    return BadRequest("Starting date must be in future");
                //}
                if (DateTime.Compare(createDTO.EndDate,createDTO.StartingDate) < 0)// ngay end nho hon ngay start
                {
                    return BadRequest("End date must be in after Starting date");
                }
                else
                {
                    discount.IsExpried = now7 < discount.StartingDate || now7 > discount.EndDate;
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
                var discount = await _db.DiscountCodes.FirstOrDefaultAsync(u => u.DiscountId == id);

                var now = DateTime.Now;
                TimeZoneInfo utcPlus7 = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
                DateTime now7 = TimeZoneInfo.ConvertTime(now, utcPlus7);
                if (discount == null)
                {
                    return NotFound("DiscountCode not found");
                }
                var recent = _unitOfWork.DiscountCodeRepository.CheckDuplicate(updateDTO.DiscountCodeName);

                if (recent != null)
                {
                    return BadRequest("Dublicate Code is not required");
                }               
                if (updateDTO.DiscountPercent < 0)
                {
                    return BadRequest("Percent must be the postive number");
                }              
                if (DateTime.Compare(DateTime.Parse(updateDTO.EndDate), DateTime.Parse(updateDTO.StartingDate)) < 0)// ngay end nho hon ngay start
                {
                    return BadRequest("End date must be in after Starting date");
                }
                else
                {
                    discount.DiscountCodeName = updateDTO.DiscountCodeName;
                    discount.DiscountPercent = updateDTO.DiscountPercent;
                    discount.StartingDate = DateTime.Parse(updateDTO.StartingDate);
                    discount.EndDate = DateTime.Parse(updateDTO.EndDate);
                    discount.IsExpried = now7 < discount.StartingDate || now7 > discount.EndDate;
                    await _unitOfWork.SaveAsync();
                    _response.StatusCode = HttpStatusCode.NoContent;
                    _response.IsSuccess = true;
                    return NoContent();
                }               
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

        [HttpPut("ApplyDiscount")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> ApplyDiscount([FromBody]ApplyDiscountDTO applyDiscountDTO)
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.PutAsync("https://fdiamond-api.azurewebsites.net/api/discount/updateauto", null);
            if (!response.IsSuccessStatusCode)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "Cannot update discount code" };
                _response.StatusCode = HttpStatusCode.InternalServerError;
                return StatusCode(500,_response);
            }
            try
            {
                var returnDTO = await _unitOfWork.DiscountCodeRepository.ApplyDiscount(applyDiscountDTO);
                _response.IsSuccess = true;
                _response.Result = returnDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.Message };
                _response.StatusCode = HttpStatusCode.BadRequest;
                return BadRequest(_response);
            }
        }
    }
}

