using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
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
        [Authorize]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> GetAllProduct()
        {
            try
            {
                IEnumerable<Product> ProductList = await _unitOfWork.ProductRepository.GetAllAsync(includeProperties: "ProductImages,ProductVariantValues");
                var model = _mapper.Map<List<ProductDTO>>(ProductList);
                _response.StatusCode = HttpStatusCode.OK;
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
        [Authorize(Roles ="Admin")]
        [HttpGet("{id:int}", Name = "GetProductById")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<APIResponse>> GetProductById(int id)
        {
            if (id <= 0)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "Product ID is invalid" };
                return BadRequest(_response);
            }
            var product = await _unitOfWork.ProductRepository.GetAsync(u => u.ProductId == id,
                includeProperties: "ProductImages,ProductVariantValues");
            if (product == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { $"Product with ID {id} was not found." };
                return NotFound(_response);
            }
            try
            {
                var productDTO = _mapper.Map<ProductDTO>(product);
                _response.StatusCode = HttpStatusCode.OK;
                _response.Result = productDTO;
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
        [HttpGet("{searchValue}", Name = "SearchProductByName")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<APIResponse>> SearchProductByName(string searchValue)
        {
            if (searchValue == "")
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "Search value is invalid" };
                return BadRequest(_response);
            }
            var product = await _unitOfWork.ProductRepository.GetAllAsync(u => u.ProductName.ToLower().Contains(searchValue.ToLower()),
                includeProperties: "ProductImages,ProductVariantValues");
            if (product == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { $"Product was not found." };
                return NotFound(_response);
            }
            try
            {
                var productDTO = _mapper.Map<List<ProductDTO>>(product);
                _response.StatusCode = HttpStatusCode.OK;
                _response.Result = productDTO;
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
        [HttpPost(Name = "CreateProduct")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> CreateProduct([FromBody] ProductCreateDTO createDTO)
        {

            if (createDTO == null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "Product is invalid" };
                return BadRequest(_response);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("ModelState");
            }
            try
            {
                var product = _mapper.Map<Product>(createDTO);
                await _unitOfWork.ProductRepository.CreateAsync(product);
                await _unitOfWork.SaveAsync();
                _response.Result = _mapper.Map<ProductDTO>(product);
                _response.StatusCode = HttpStatusCode.Created;
                return CreatedAtRoute("GetProductById", new { id = product.ProductId }, _response);

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
            }
            return _response;
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

                var product = await _db.Products
                                       .Include(p => p.ProductVariantValues)
                                       .Include(p => p.ProductImages)
                                       .FirstOrDefaultAsync(u => u.ProductId == updateDTO.ProductId);

                if (product == null)
                {
                    return NotFound("Product not found");
                }
                _mapper.Map(updateDTO, product);

                foreach (var variantValueDto in updateDTO.ProductVariantValues)
                {
                    _unitOfWork.ProductVariantValueRepository.UpdateVariantValue(product, variantValueDto);
                }

                foreach (var imageDto in updateDTO.ProductImages)
                {
                    _unitOfWork.ProductImageRepository.UpdateProductImageAsync(product, imageDto, imageDto.IsGia);
                }

                await _unitOfWork.SaveAsync();

                _response.StatusCode = HttpStatusCode.NoContent;
                _response.IsSuccess = true;
                _response.Result = _mapper.Map<ProductDTO>(product);
                return _response;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { ex.ToString() };
            }

            return _response;
        }

        [HttpPut("Update/{id:int}", Name = "UpdateProductStatus")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> UpdateProductStatus(int id, bool visible)
        {
            try
            {
                var product = await _unitOfWork.ProductRepository.GetAsync(u => u.ProductId == id);
                if (product == null)
                {
                    return NotFound("Product not found");
                }
                product.IsVisible = visible;
                await _unitOfWork.SaveAsync();
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
        [HttpPut("Delete/{id:int}", Name = "DeleteProduct")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<APIResponse>> DeleteProduct(int id, bool delete)
        {
            try
            {
                var product = await _unitOfWork.ProductRepository.GetAsync(u => u.ProductId == id);
                if (product == null)
                {
                    return NotFound("Product not found");
                }
                product.IsDeleted = delete;
                await _unitOfWork.SaveAsync();
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
