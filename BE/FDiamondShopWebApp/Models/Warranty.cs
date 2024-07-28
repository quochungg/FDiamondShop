namespace FDiamondShop.API.Models
{
    public class Warranty
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public string CustomerName { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        //public Warranty(Order order)
        //{
        //    this.Order = order;
        //    CustomerName = Order.User.LastName + " " + Order.User.FirstName;
        //    OrderDate = Order.OrderDate;
        //    OrderId = Order.OrderId;
        //    ExpiryDate = Order.OrderDate.AddYears(5);
        //}
        public Warranty()
        {

        }
    }
}
