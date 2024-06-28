namespace FDiamondShop.API.Helper
{
    public class PayPalResponseModel
    {
        public string OrderId { get; set; }
        public string PaymentMethod { get; set; }
        public string PaymentId { get; set; }
        public bool Success { get; set; }
    }
}
