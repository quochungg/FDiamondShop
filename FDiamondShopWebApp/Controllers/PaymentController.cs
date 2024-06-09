using FDiamondShop.API.Helper;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace FDiamondShop.API.Controllers
{
    [Route("api/checkout")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly APIResponse _response;
        public PaymentController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _response = new();
        }

        [HttpPost("vnpay")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public IActionResult CreatePaymentUrl([FromBody] PaymentInformationModel model)
        {
            try
            {
                var paymentUrl = _unitOfWork.VnPayRepository.CreatePaymentUrl(model, HttpContext);
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = paymentUrl;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add(ex.Message);
                return BadRequest(_response);
            }

        }
        [HttpGet("executepay")]
        public IActionResult PaymentExecute()
        {
            var response = _unitOfWork.VnPayRepository.PaymentExecute(Request.Query);

            return Ok(response);
        }
        [HttpPost("momo")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> CreateMomoPaymentUrl(PaymentInformationModel model)
        {
            try
            {
                var paymentUrl =await _unitOfWork.MomoRepository.CreateMomoPaymentAsync(model);
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = paymentUrl;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add(ex.Message);
                return BadRequest();
            }

        }
        [HttpGet("executepayMomo")]
        public async Task<IActionResult> PaymentExecuteMomo()
        {
            var response = await _unitOfWork.MomoRepository.PaymentExecuteAsync(HttpContext.Request.Query);

            return Ok(response);
        }
    }
}
