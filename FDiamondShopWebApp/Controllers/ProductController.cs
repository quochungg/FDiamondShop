using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository;
using FDiamondShop.API.Repository.IRepository;
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
            }
            catch (Exception ex)
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
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<APIResponse>> GetAProduct(int id)
        {
            if (id <= 0)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "Product ID is invalid" };
                return BadRequest(_response);
            }
            var product = await _unitOfWork.ProductRepository.GetProductByIdAsync(id);
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
        [HttpPost(Name = "CreateProduct")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> CreateProduct([FromBody] ProductCreateDTO createDTO)
        {
            try
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
                    var existingVariantValue = product.ProductVariantValues
                        .FirstOrDefault(pvv => pvv.VariantId == variantValueDto.VariantId);

                    if (existingVariantValue != null)
                    {
                        existingVariantValue.Value = variantValueDto.Value;
                    }
                    else
                    {
                        var newVariantValue = _mapper.Map<ProductVariantValue>(variantValueDto);
                        newVariantValue.ProductId = product.ProductId;
                        product.ProductVariantValues.Add(newVariantValue);
                    }
                }

                foreach (var imageDto in updateDTO.ProductImages)
                {
                    var existingImage = product.ProductImages
                        .FirstOrDefault(pi => pi.ProductId == updateDTO.ProductId && !pi.IsGia);

                    if (existingImage != null)
                    {
                        existingImage.ImageUrl = imageDto.ImageUrl;
                    }
                    else
                    {
                        var newImage = _mapper.Map<ProductImage>(imageDto);
                        newImage.ProductId = product.ProductId;
                        product.ProductImages.Add(newImage);
                    }
                }

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
