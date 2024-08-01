using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
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
        public async Task<ActionResult<APIResponse>> GetAllProduct(
            [FromQuery(Name = "Category Name")] string? cateName, 
            [FromQuery(Name = "Subcategory Name")] string? Subcate,
            [FromQuery(Name = "Is Visible")] bool? visible, 
            [FromQuery(Name = "Is Deleted")] bool? delete, 
            [FromQuery(Name = "Order By")] string? orderBy, 
            [FromQuery(Name = "Sort By")] string sortBy = "asc")           
        {
            
            IEnumerable<Product> ProductList = await _unitOfWork.ProductRepository.GetAllAsync(includeProperties: "ProductImages,ProductVariantValues.Variant,SubCategory.Category");
           
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
                foreach (var product in model)
                {
                    product.SubCategoryName = ProductList.FirstOrDefault(p => p.ProductId == product.ProductId).SubCategory.SubcategoryName;                
                }
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
                includeProperties: "ProductImages,ProductVariantValues.Variant,SubCategory.Category");
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
                productDTO.CategoryName = _unitOfWork.ProductRepository.GetAsync(p => p.ProductId == product.ProductId).Result.SubCategory.Category.CategoryName;
                productDTO.CategoryId = _unitOfWork.SubCategoryRepository.GetAsync(s => s.SubCategoryId == product.SubCategoryId).Result.CategoryId;
                productDTO.SubCategoryName = _unitOfWork.ProductRepository.GetAsync(p => p.ProductId == product.ProductId).Result.SubCategory.SubcategoryName;
                foreach (var variant in productDTO.ProductVariantValues)
                {
                    variant.VariantName  = _unitOfWork.ProductRepository.GetAsync(p => p.ProductId == product.ProductId).Result
                    .ProductVariantValues.FirstOrDefault(v => v.VariantId == variant.VariantId).Variant.VariantName;
                }
                var recommendProducts = await _unitOfWork.ProductRepository.GetRecommendProducts(product.ProductId);
                productDTO.RecommendProducts = _mapper.Map<List<RecommendProductDTO>>(recommendProducts);
                _response.IsSuccess = true;
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
        [HttpGet("GetProductbyName")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<APIResponse>> GetProductbyName (string? searchproductname,
            [FromQuery(Name = "PageSize")] int pageSize = 10,
            [FromQuery(Name = "PageNumber")] int pageNumber = 1)
        {
            var ProductList = await _unitOfWork.ProductRepository.SearchProductByName(searchproductname);

            if(ProductList.Count()==0)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "No Products Found" };
                return BadRequest(_response);
            }
            try
            {
                var count = ProductList.Count();
                ProductList = ProductList
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize);
                var productDTOList = _mapper.Map<List<ProductDTO>>(ProductList);

                foreach (var productDTO in productDTOList)
                {
                    var product = _mapper.Map<Product>(productDTO);

                    productDTO.SubCategoryName = ProductList.FirstOrDefault(p => p.ProductId == product.ProductId).SubCategory.SubcategoryName;

                    productDTO.CategoryName = _unitOfWork.ProductRepository.GetAsync(p => p.ProductId == product.ProductId).Result.SubCategory.Category.CategoryName;
                    productDTO.CategoryId = _unitOfWork.SubCategoryRepository.GetAsync(s => s.SubCategoryId == product.SubCategoryId).Result.CategoryId;
                    foreach (var variant in productDTO.ProductVariantValues)
                    {
                        variant.VariantName = _unitOfWork.ProductRepository.GetAsync(p => p.ProductId == product.ProductId).Result
                            .ProductVariantValues.FirstOrDefault(v => v.VariantId == variant.VariantId).Variant.VariantName;
                    }
                }
                
                var totalPages = (int)Math.Ceiling(count / (double)pageSize);
                var model = new PaginatedList<ProductDTO>(productDTOList, pageNumber, totalPages, count);
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
            var existed = await _db.Products.FirstOrDefaultAsync(p => p.ProductName.Trim().ToLower() == createDTO.ProductName.Trim().ToLower());
            if (existed != null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "Product's name is existed" };
                return BadRequest(_response);
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
                var existed = await _db.Products.FirstOrDefaultAsync(p => p.ProductName.Trim().ToLower() == updateDTO.ProductName.Trim().ToLower() && p.ProductId != updateDTO.ProductId);
                if (existed != null)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages = new List<string> { "Product's name is existed" };
                    return BadRequest(_response);
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
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<APIResponse>> GetProductFiltering(
            [FromQuery(Name = "CategoryName")] string cateName, 
            [FromQuery(Name = "SubcategoryName")] string subCate,
            [FromQuery(Name = "OrderBy")] string orderBy = "ProductName", 
            [FromQuery(Name = "SortBy")] string sortBy = "asc", 
            [FromQuery(Name = "PageSize")] int pageSize = 12, 
            [FromQuery(Name = "PageNumber")] int pageNumber = 1, 
            [FromQuery(Name = "Clarity")] string clarity = null,
            [FromQuery(Name = "Cut")] string cut = null,
            [FromQuery(Name = "Color")] string color = null,
            [FromQuery(Name = "CaratFrom")] double caratFrom = 1.0,
            [FromQuery(Name = "CaratTo")] double caratTo = 30.0,
            [FromQuery(Name = "PriceFrom")] decimal priceFrom = 1,
            [FromQuery(Name = "PriceTo")] decimal priceTo = 30000,
            [FromQuery(Name = "Metal")] string metal = null
            )
        {
            IEnumerable<Product> productList = await _unitOfWork.ProductRepository.GetAllAsync(p => p.IsVisible == true && p.IsDeleted == false, includeProperties: "ProductImages,ProductVariantValues.Variant,SubCategory.Category");

            if (cateName != null)
            {
                productList = productList.Where(u => u.SubCategory.Category.CategoryName.ToLower().Contains(cateName.ToLower()));
            }
            if (subCate != null)
            {
                // Split the input string by commas and convert each subcategory to lowercase
                var subCategories = subCate.Split(',')
                                           .Select(s => s.Trim().ToLower())
                                           .ToArray();

                // Filter the product list to include products with any of the subcategories
                productList = productList.Where(u => subCategories.Any(s => u.SubCategory.SubcategoryName.ToLower().Contains(s)));
            }
            if (orderBy != null)
            {
                if (sortBy.ToLower() == "desc")
                {
                    productList = productList.OrderByDescending(u => u.GetType().GetProperty(orderBy).GetValue(u, null));
                }
                else
                {
                    productList = productList.OrderBy(u => u.GetType().GetProperty(orderBy).GetValue(u, null));
                }
            }
            productList = productList.Where(u => u.BasePrice >= priceFrom && u.BasePrice <= priceTo);
            if (cateName?.ToLower() == "diamond")
            {
                var calarityList = clarity?.Split(',')
                    .Select(s => s.Trim())
                    .ToList();
                productList = productList.Where(p =>
                    p.ProductVariantValues.Any(v => v.VariantId == 4 && Convert.ToDouble(v.Value) >= caratFrom && Convert.ToDouble(v.Value) <= caratTo) &&
                    (clarity == null || p.ProductVariantValues.Any(v => v.VariantId == 2 && calarityList.Contains(v.Value))) &&
                    (color == null || p.ProductVariantValues.Any(v => v.VariantId == 1 && color.Contains(v.Value))) &&
                    (cut == null || p.ProductVariantValues.Any(v => v.VariantId == 3 && cut.Contains(v.Value)))
                );
            }
            else
            {
                productList = productList.Where(p =>
                    metal == null || p.ProductVariantValues.Any(v => (v.VariantId == 8 || v.VariantId == 11 || v.VariantId == 9) && metal.ToLower().Contains(v.Value.ToLower()))
                );
            }
            
            var count = productList.Count();
            productList = productList
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize);
            if (!productList.Any())
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string> { "Product not found" };
                return NotFound(_response);
            }

            var productDTOList = _mapper.Map<List<ProductDTO>>(productList);
            
            foreach (var product in productDTOList)
            {
                product.SubCategoryName = productList.FirstOrDefault(p => p.ProductId == product.ProductId).SubCategory.SubcategoryName;
                foreach (var variant in product.ProductVariantValues)
                {
                    variant.VariantName = productList.FirstOrDefault(p => p.ProductId == product.ProductId).ProductVariantValues.FirstOrDefault(v => v.VariantId == variant.VariantId).Variant.VariantName;
                }
            }

            //Pagination
            var totalPages = (int)Math.Ceiling(count / (double)pageSize);
            var model = new PaginatedList<ProductDTO>(productDTOList, pageNumber, totalPages, count);
            try
            {
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
