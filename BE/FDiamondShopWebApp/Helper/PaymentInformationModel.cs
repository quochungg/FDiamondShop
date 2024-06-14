namespace FDiamondShop.API.Helper
{
    public class PaymentInformationModel
    {
        public string OrderType { get; set; }
        public decimal Amount { get; set; }
        public string OrderID { get; set; }
        public string OrderDescription { get; set; }
        public string Name { get; set; }
    }
}
