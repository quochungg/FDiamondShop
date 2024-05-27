using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace FDiamondShop.API.Controllers
{
    [Route("api/Product")]
    [ApiController]

    public class ProductController : ControllerBase
    {
        private readonly APIResponse _response;
        private readonly FDiamondContext _db;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ProductController(IUnitOfWork unitOfWork, FDiamondContext db, IMapper mapper)
        {
            this._response = new();
            _unitOfWork = unitOfWork;
            _db = db;
            _mapper = mapper;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> GetAllProduct()
        {
            try
            {
                IEnumerable<Product> ProductList = await _unitOfWork.ProductRepository.GetAllProductsAsync();
                var model = _mapper.Map<List<ProductDTO>>(ProductList);
                _response.StatusCode = HttpStatusCode.OK;
                _response.Result = model;
                return Ok(_response);
            }catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
                return BadRequest(_response);
            }
        }

        [HttpGet("{id:int}", Name = "GetProductById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> GetAProduct(int id)
        {
            try
            {
                var product = await _unitOfWork.ProductRepository.GetProductByIdAsync(id);
                var productDTO = _mapper.Map<ProductDTO>(product);
                _response.StatusCode = HttpStatusCode.OK;
                _response.Result = productDTO;
                return _response;
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
                return _response;
            }
        }


        [HttpPut("{id:int}", Name = "UpdateProduct")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> UpdateProduct(int id, [FromBody] ProductUpdateDTO updateDTO)
        {
            try
            {
                if (updateDTO == null || id != updateDTO.ProductId)
                {
                    ModelState.AddModelError("CustomError", "ID is not Valid!");
                    return BadRequest(ModelState);
                }
                Product model = _mapper.Map<Product>(updateDTO);
                await _unitOfWork.ProductRepository.UpdateProduct(model);
                await _unitOfWork.SaveAsync();
                _response.StatusCode = HttpStatusCode.NoContent;
                _response.IsSuccess = true;
                return _response;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
            }
            return _response;
        }

    }
}
