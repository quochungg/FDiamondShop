namespace FDiamondShop.API.Models.DTO
{
    public class ValidCartLineDTO
    {
        public bool IsValid { get; set; } = true;
        public List<int> DuplicateCartLine { get; set; } = new List<int>();
        public List<int> InvisibleCartLine { get; set; } = new List<int>();
        public List<OutOfStockProductDTO> OutOfStockCartLines { get; set; } = new List<OutOfStockProductDTO>();
    }
}   
