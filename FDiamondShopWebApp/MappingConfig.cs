using AutoMapper;
using FDiamondShopWebApp.Models;
using FDiamondShopWebApp.Models.DTO;
using System.Runtime.CompilerServices;

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
