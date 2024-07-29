using System.ComponentModel.DataAnnotations.Schema;

namespace FDiamondShop.API.Models
{
    public class Order
    {
        public int OrderId { get; set; }

        public string UserId { get; set; }
       
        public DateTime OrderDate { get; set; } = DateTime.Now;

        public int? PaymentId { get; set; }
        public Payment? Payment { get; set; }

        public decimal BasePrice { get; set; }

        public decimal TotalPrice { get; set; }
        [ForeignKey("DiscountCode")]
        public int? DiscountCodeId { get; set; }

        public DiscountCode? DiscountCode { get; set; }

        public ApplicationUser User { get; set; }

        public ICollection<CartLine> CartLines { get; set; }

        public string Status { get; set; } = "Ordered";

        public DateTime? UpdateDate { get; set; }

        [ForeignKey("DeliveryDetail")]
        public int? DeliveryDetailId { get; set; }

        public DeliveryDetail? DeliveryDetail { get; set; }

        public string? OrderManagementStaffId { get; set; }

        public ApplicationUser? OrderManagementStaff { get; set; }

        public Warranty Warranty { get; set; }
        public string PaymentURL { get; set; }

    }
}
