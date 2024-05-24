using AutoMapper;
using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;
using FDiamondShop.API.Repository;
using FDiamondShopWebApp.Repository;
using Microsoft.AspNetCore.Mvc;

namespace FDiamondShop.API.Controllers
{
    [Route("api/Product")]
    [ApiController]

    public class ProductController : ControllerBase
    {
        private readonly APIResponse _response;
        private readonly FDiamondContext _db;
        private readonly UnitOfWork unitOfWork;
        private readonly IMapper _mapper;
        public ProductController(UnitOfWork unitOfWork, FDiamondContext db , IMapper mapper)
        {
            this._response = new();
            this.unitOfWork = unitOfWork;
            _db = db;
            _mapper = mapper;
        }
        [HttpGet] //endpoint to get data
        [ProducesResponseType(StatusCodes.Status200OK)]
        //using async
        public async Task<ActionResult<APIResponse>> GetProduct() // Ienmerarble la kieu dem duoc
        {



            IEnumerable<Product> ProductList = await unitOfWork.ProductRepository.GetAllAsync();
            _response.Result = _mapper.Map<List<ProductDTO>>(ProductList);
            await unitOfWork.SaveAsync();
            return Ok(ProductList);
        }
    }
}
