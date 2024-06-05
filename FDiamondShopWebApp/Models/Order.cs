namespace FDiamondShop.API.Models
{
    public class Order
    {
        public int OrderId { get; set; }

        public string UserId { get; set; }

        public DateTime OrderDate { get; set; }

        public string Status { get; set; }

        public string PaymentType { get; set; }

        public DateTime PaymentDateTime { get; set; }

        public decimal Total { get; set; }

        public string Note { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public ApplicationUser User { get; set; }

        public ICollection<OrderLine> OrderLines { get; set; }

    }
}
