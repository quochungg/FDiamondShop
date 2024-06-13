using System.ComponentModel.DataAnnotations.Schema;

namespace FDiamondShop.API.Models
{
    public class Order
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.Now;

        public int PaymentId { get; set; }

        public decimal BasePrice { get; set; }

        public decimal TotalPrice { get; set; }

        public string? DiscountCodeId { get; set; }

        public DiscountCode? DiscountCode { get; set; }

        public ApplicationUser User { get; set; }

        public ICollection<CartLine> CartLines { get; set; }

    }
}
