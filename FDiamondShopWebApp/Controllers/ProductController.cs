using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
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
        private readonly IMapper  _mapper;
        public ProductController(IUnitOfWork unitOfWork, FDiamondContext db, IMapper mapper)
        {
            this._response = new();
            _unitOfWork = unitOfWork;
            _db = db;
            _mapper = mapper;
        }


        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> GetAllProduct([FromQuery(Name = "Category Name")] string? cateName, [FromQuery(Name = "Subcategory Name")] string? Subcate,
            [FromQuery(Name = "Is Visible")] bool? visible, [FromQuery(Name = "Is Deleted")] bool? delete, [FromQuery(Name = "Order By")] string? orderBy, 
            [FromQuery(Name = "Sort By")] string sortBy = "asc")           
        {
            
            IEnumerable<Product> ProductList = await _unitOfWork.ProductRepository.GetAllAsync(includeProperties: "ProductImages,ProductVariantValues,SubCategory.Category");
           
            if (cateName != null)
            {
               ProductList = ProductList.Where(u => u.SubCategory.Category.CategoryName.ToLower().Contains(cateName.ToLower()));
            }
            if (Subcate != null)
            {
                ProductList = ProductList.Where(u => u.SubCategory.SubcategoryName.ToLower().Contains(Subcate.ToLower()));
            }
            if (visible != null){
                ProductList = ProductList.Where(u => u.IsVisible == visible);
            }
            if (delete != null)
            {
                ProductList = ProductList.Where(u => u.IsDeleted == delete);
            }
            if (orderBy != null)
            {
                if (sortBy.ToLower() == "desc")
                {
                    ProductList = ProductList.OrderByDescending(u => u.GetType().GetProperty(orderBy).GetValue(u, null));
                }
                else
                {
                    ProductList = ProductList.OrderBy(u => u.GetType().GetProperty(orderBy).GetValue(u, null));
                }
            }
            else
            {
                if (sortBy.ToLower() == "desc")
                {
                    ProductList = ProductList.OrderByDescending(u => u.ProductName);
                }
                else
                {
                    ProductList = ProductList.OrderBy(u => u.ProductName);

                }
            }
            try
            {
                
                var model = _mapper.Map<List<ProductDTO>>(ProductList);
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

        //[Authorize(Roles = "admin")]
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
        [HttpPost(Name = "CreateProduct")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> CreateProduct([FromBody] ProductCreateDTO createDTO)
        {
            var subcate = await _db.SubCategories.FirstOrDefaultAsync(s => s.SubcategoryName == createDTO.SubCategoryName.Trim());
            if (subcate == null)
            {
                ModelState.AddModelError("CustomError", "Subcategory is not valid!");
                return BadRequest(ModelState);
            }

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
                product.SubCategoryId = subcate.SubCategoryId;
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
                var productImages = _mapper.Map<List<ProductImage>>(updateDTO.ProductImages);
                _unitOfWork.ProductImageRepository.UpdateProductImageAsync(product, productImages);
                

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
        [HttpGet("GetProductWithFilter")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> GetProductFiltering(
            [FromQuery(Name = "Category Name")] string cateName, 
            [FromQuery(Name = "Subcategory Name")] string subCate,
            [FromQuery(Name = "Order By")] string orderBy = "ProductName", 
            [FromQuery(Name = "Sort By")] string sortBy = "asc", 
            [FromQuery(Name = "Page Size")] int pageSize = 10, 
            [FromQuery(Name = "Page Number")] int pageNumber = 1, 
            [FromQuery(Name = "Clarity")] string clarity = null,
            [FromQuery(Name = "Cut")] string cut = null,
            [FromQuery(Name = "Color")] string color = null,
            [FromQuery(Name = "CaratFrom")] double caratFrom = 1.0,
            [FromQuery(Name = "CaratTo")] double caratTo = 30.0,
            [FromQuery(Name = "PriceFrom")] decimal priceFrom = 1000,
            [FromQuery(Name = "PriceTo")] decimal priceTo = 30000,
            [FromQuery(Name = "Metal")] string metal = null
            )
        {
                IEnumerable<Product> ProductList = await _unitOfWork.ProductRepository
                .GetAllAsync(includeProperties: "ProductImages,ProductVariantValues,SubCategory.Category");

            if (cateName != null)
            {
                ProductList = ProductList.Where(u => u.SubCategory.Category.CategoryName.ToLower().Contains(cateName.ToLower()));
            }
            if (subCate != null)
            {
                ProductList = ProductList.Where(u => u.SubCategory.SubcategoryName.ToLower().Contains(subCate.ToLower()));
            }
            if (orderBy != null)
            {
                if (sortBy.ToLower() == "desc")
                {
                    ProductList = ProductList.OrderByDescending(u => u.GetType().GetProperty(orderBy).GetValue(u, null));
                }
                else
                {
                    ProductList = ProductList.OrderBy(u => u.GetType().GetProperty(orderBy).GetValue(u, null));
                }
            }
            ProductList = ProductList.Where(u => u.BasePrice >= priceFrom && u.BasePrice <= priceTo);
            switch (cateName)
            {
                case "Diamond":
                    //filter by carat
                    ProductList = ProductList.Where(u => u.ProductVariantValues
                    .Any(v => v.VariantId == 4 && Convert.ToDouble(v.Value) >= caratFrom && Convert.ToDouble(v.Value) <= caratTo));
                    if(clarity != null) {
                        //fliter by clarity
                        ProductList = ProductList.Where(u => clarity.Contains(u.ProductVariantValues.FirstOrDefault(v => v.VariantId == 2).Value));
                    }
                    if(color != null)
                    {
                        //filter by color
                        ProductList = ProductList.Where(u => color.Contains(u.ProductVariantValues.FirstOrDefault(v => v.VariantId == 1).Value));
                    }                              
                    if (cut != null)
                    {
                        //filter by cut
                        ProductList = ProductList.Where(u => cut.Contains(u.ProductVariantValues.FirstOrDefault(v => v.VariantId == 3).Value));
                    }
                    break;
                default:
                    //filter by metal
                    if (metal != null)
                    {
                        ProductList = ProductList.Where(u => metal.Contains(u.ProductVariantValues
                        .FirstOrDefault(v => v.VariantId == 8 || v.VariantId == 11 || v.VariantId == 9).Value));
                    }
                    break;

            }
            ProductList = ProductList.Skip(pageSize * (pageNumber - 1)).Take(pageSize);
            try
            {

                var model = _mapper.Map<List<ProductDTO>>(ProductList);
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
    }
}
