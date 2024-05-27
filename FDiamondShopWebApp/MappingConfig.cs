using AutoMapper;
using FDiamondShop.API.Models;
using FDiamondShop.API.Models.DTO;


namespace FDiamondShop.API
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {
            CreateMap<Product,ProductDTO>().ReverseMap();
            CreateMap<Product,ProductCreateDTO>().ReverseMap();
            CreateMap<Product, ProductUpdateDTO>().ReverseMap();

            CreateMap<ProductImage,ProductImageCreateDTO>().ReverseMap();
            CreateMap<ProductVariantValue,ProductVariantValueCreateDTO>().ReverseMap();
            CreateMap<ProductImage,ProductImageDTO>().ReverseMap();
            CreateMap<ProductVariantValue,ProductVariantValueDTO>().ReverseMap();


        }
    }
}
