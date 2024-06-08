namespace FDiamondShop.API.Models.DTO
{
    public class FilterDiamondDTO
    {
        public ICollection<string> Color { get; set; }
        public ICollection<string> Clarity { get; set; }
        public ICollection<string> CaratWeight { get; set; }
        public ICollection<string> Cut { get; set; }
        public ICollection<string> Fluorescene { get; set; }
        public ICollection<string> Length { get; set; }
        public ICollection<string> Depth { get; set; }

    }
}
