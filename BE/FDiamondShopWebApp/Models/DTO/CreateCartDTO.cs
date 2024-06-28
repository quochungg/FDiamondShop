namespace FDiamondShop.API.Models.DTO
{
    public class CreateCartDTO
    {
        public string UserName { get; set; }
        public List<CartLineItemCreateDTO> CartLineItems { get; set; }
    }
}
