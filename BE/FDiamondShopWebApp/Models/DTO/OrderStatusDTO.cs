using RestSharp.Authenticators.OAuth;

namespace FDiamondShop.API.Models.DTO
{
    public class OrderStatusDTO
    {
        public int OrderId { get; set; }
        public string Status { get; set; }

        public string? FailReason { get; set; }
    }
}
