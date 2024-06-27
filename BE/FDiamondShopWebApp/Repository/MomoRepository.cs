using FDiamondShop.API.Helper;
using FDiamondShop.API.Repository.IRepository;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Text;
using RestSharp;
using Newtonsoft.Json.Linq;
using Azure;
using PayPalCheckoutSdk.Orders;
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

        public async Task<string> CreateMomoPaymentAsync(PaymentInformationModel model)
        {
            string result = "";
            int responsecode = 0;
            model.OrderID = DateTime.UtcNow.Ticks.ToString();
            string rawData = $"partnerCode={_configuration["MomoAPI:PartnerCode"]}" +
                $"&accessKey={_configuration["MomoAPI:AccessKey"]}" +
                $"&requestId={model.OrderID}" +
                $"&amount={model.Amount}" +
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
                extraData = "",
                signature = Signature,
            };
            request.AddParameter("application/json", JsonConvert.SerializeObject(requestData), ParameterType.RequestBody);
            var response = await client.ExecuteAsync(request);
            var jsonResponse = JsonConvert.DeserializeObject<JObject>(response.Content);
            string code = jsonResponse["errorCode"].ToString();
            responsecode = Convert.ToInt32(code);
            if(responsecode == 0)
            {
                result = jsonResponse["payUrl"].ToString();
            }
            else
            {
                string error = jsonResponse["message"].ToString();
                result = error;
            }                          
            return result;
        }

        public MomoExecuteResponseModel PaymentExecute(IQueryCollection collection)
        {
            collection.TryGetValue("amount", out var amountValue);
            collection.TryGetValue("orderInfo", out var orderInfoValue);
            collection.TryGetValue("orderId", out var orderIdValue);
            collection.TryGetValue("resultCode", out var statusValue); // Assumption: MoMo returns a resultCode for status
            collection.TryGetValue("message", out var messageValue); // Assumption: MoMo returns a message

            // Chuyển đổi giá trị sang chuỗi hoặc sử dụng chuỗi rỗng nếu không có giá trị
            string amount = amountValue.Count > 0 ? amountValue.ToString() : string.Empty;
            string orderInfo = orderInfoValue.Count > 0 ? orderInfoValue.ToString() : string.Empty;
            string orderId = orderIdValue.Count > 0 ? orderIdValue.ToString() : string.Empty;
            string status = statusValue.Count > 0 ? statusValue.ToString() : string.Empty;
            string message = messageValue.Count > 0 ? messageValue.ToString() : string.Empty;

            return new MomoExecuteResponseModel()
            {
                Amount = amount,
                OrderId = orderId,
                OrderInfo = orderInfo,
                Status = status,
                Message = message
            };
        }

        
    }
}