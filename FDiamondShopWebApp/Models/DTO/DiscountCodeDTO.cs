using System.ComponentModel.DataAnnotations;

namespace FDiamondShop.API.Models.DTO
{
    public class DiscountCodeDTO
    {
        public int discount_id { get; set; }
        public string discount_code { get; set; }
        public int discount_percent { get; set; } = 0;
        public string description { get; set; }
        public DateTime? starting_date { get; set; }
        public DateTime? end_date { get; set; }
        public bool is_expried { get; set; }
    }
}
