using FDiamondShop.API.Helper;
using FDiamondShop.API.Repository.IRepository;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Text;
using RestSharp;
using Newtonsoft.Json.Linq;
namespace FDiamondShop.API.Repository
{
    public class MomoRepository : IMomoRepository
    {
        private readonly IConfiguration _configuration;

        public MomoRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }



        private string ComputeHmacSha256(string message, string secretKey)
        {
            var keyBytes = Encoding.UTF8.GetBytes(secretKey);
            var messageBytes = Encoding.UTF8.GetBytes(message);

            byte[] hashBytes;

            using (var hmac = new HMACSHA256(keyBytes))
            {
                hashBytes = hmac.ComputeHash(messageBytes);
            }

            var hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

            return hashString;
        }
        public  async Task <Object> CreateMomoPaymentAsync(PaymentInformationModel model)
        {
            model.OrderID = DateTime.UtcNow.Ticks.ToString();
            string rawData = $"partnerCode={_configuration["MomoAPI:PartnerCode"]}" +
                $"&accessKey={_configuration["MomoAPI:AccessKey"]}" +
                $"&requestId={model.OrderID}" +
                $"&amount={model.Amount.ToString()}" +
                $"&orderId={model.OrderID}" +
                $"&orderInfo={model.OrderDescription}" +
                $"&returnUrl={_configuration["MomoAPI:ReturnUrl"]}" +
                $"&notifyUrl={_configuration["MomoAPI:NotifyUrl"]}" +
                $"&extraData=";
                            
            string Signature = ComputeHmacSha256(rawData, _configuration["MomoAPI:SecretKey"]);
            var client = new RestClient(_configuration["MomoAPI:MomoApiUrl"]);
            var request = new RestRequest() { Method = Method.Post };
            request.AddHeader("Content-Type", "application/json; charset=UTF-8");

            var requestData = new
            {
                accessKey = _configuration["MomoAPI:AccessKey"],
                partnerCode = _configuration["MomoAPI:PartnerCode"],
                requestType = _configuration["MomoAPI:RequestType"],
                notifyUrl = _configuration["MomoAPI:NotifyUrl"],
                returnUrl = _configuration["MomoAPI:ReturnUrl"],
                orderId = model.OrderID,
                amount = model.Amount.ToString(),
                orderInfo = model.OrderDescription,
                requestId = model.OrderID,
                extraData="",
                signature = Signature,
            };
            
            request.AddParameter("application/json", JsonConvert.SerializeObject(requestData), ParameterType.RequestBody);
            var response = await client.ExecuteAsync(request);        
            return JsonConvert.DeserializeObject(response.Content);
            

        }
        public async Task<MomoExecuteResponseModel>  PaymentExecuteAsync(IQueryCollection collection)
        {
            var amount = collection.First(s => s.Key == "amount").Value;
            var orderInfo = collection.First(s => s.Key == "orderInfo").Value;
            var orderId = collection.First(s => s.Key == "orderId").Value;
            return new MomoExecuteResponseModel()
            {
                Amount = amount,
                OrderId = orderId,
                OrderInfo = orderInfo
            };
        }


    }
}
