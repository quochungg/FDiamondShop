namespace FDiamondShop.API.Helper
{
    public class MomoExecuteResponseModel
    {
        public string OrderId { get; set; }
        public string Amount { get; set; }
        public string OrderInfo { get; set; }
        public string Status { get; set; }  // Trạng thái giao dịch
        public string Message { get; set; } 
    }
}
