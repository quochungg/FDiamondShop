using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace FDiamondShop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly APIResponse _response;
        private readonly FDiamondContext _db;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CategoryController(IUnitOfWork unitOfWork, IMapper mapper, FDiamondContext db)
        {
            this._response = new();
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _db = db;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<APIResponse>> GetCategory([FromQuery(Name = "Category Name")] string categoryName)
        {
            var category = await _unitOfWork.CategoryRepository.GetAsync(c => c.CategoryName.Equals(categoryName), includeProperties: "SubCategories.Products");
            if (category == null)
            {
                return NotFound();
            }
            var model = _mapper.Map<CategoryDTO>(category);

            var productCount = _db.Categories
            .Where(c => c.CategoryName == categoryName)
            .SelectMany(c => c.SubCategories)
            .SelectMany(sc => sc.Products)
            .Count();

            model.ProductCount = productCount;


            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = model;
            return Ok(_response);
        }
    }
}
