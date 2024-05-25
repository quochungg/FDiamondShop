using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<APIResponse>> GetAllProduct()
        {
            IEnumerable<Product> ProductList = await _unitOfWork.ProductRepository.GetAllProductsAsync();
            var model = _mapper.Map<List<ProductDTO>>(ProductList);
            _response.Result = model;
            return Ok(_response);
        }
    }
}
