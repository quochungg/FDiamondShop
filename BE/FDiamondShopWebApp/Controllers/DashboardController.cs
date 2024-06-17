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
    public class DashboardController : ControllerBase
    {
        private readonly APIResponse _response;
        private readonly FDiamondContext _db;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public DashboardController(IUnitOfWork unitOfWork, IMapper mapper, FDiamondContext db)
        {
            this._response = new();
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _db = db;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<APIResponse>> GetDashboard([FromBody] string? date)
        {
            DateTime dateTime;
            if (date == null || !DateTime.TryParse(date, out dateTime))
            {
                dateTime = DateTime.Now.Date;
            }

            // Get orders for the specified date (year, month, day)
            var orders = await _unitOfWork.OrderRepository.GetAllAsync(
                o => o.OrderDate.Year == dateTime.Year && o.OrderDate.Month == dateTime.Month && o.OrderDate.Day == dateTime.Day,
                includeProperties: "DiscountCode,CartLines"
            );

            //Completed Order
            var completedOrder = orders.Count;

            //Total Sold Product
            var totalSoldProduct = orders.SelectMany(o => o.CartLines).SelectMany(cl => cl.CartLineItems).Count();

            //Discount Used
            var discountUsed = orders.Where(o => o.DiscountCodeId != null).Count();

            //Total Income
            var totalIncome  = orders.SelectMany(o => o.CartLines).SelectMany(cl => cl.CartLineItems).Sum(cli => cli.Price);

            //Average Income
            var averageIncome = totalIncome / completedOrder;

            //Total Discount
            var discount = orders.Select(o => o.BasePrice - o.TotalPrice).Sum();

            //Actual Imcome
            var actualIncome = totalIncome - discount;

            DashboardDTO dashboardDTO = new()
            {
                ActualIncome = actualIncome,
                AverageIncome = averageIncome,
                CompletedOrder = completedOrder,
                DiscountUsed = discountUsed,
                Discount = discount,
                TotalIncome = totalIncome,
                TotalSoldProduct = totalSoldProduct
            };
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = dashboardDTO;
            return _response ;
        }
    }
}
