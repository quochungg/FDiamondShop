using AutoMapper;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;


namespace FDiamondShopWebApp
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {
            CreateMap<Product,ProductDTO>().ReverseMap();
        }
    }
}
