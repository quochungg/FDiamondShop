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
            CreateMap<Product,ProductCreateDTO>().ForMember(dest => dest.ProductImages, opt => opt.Ignore()) 
            .ForMember(dest => dest.ProductVariantValues, opt => opt.Ignore()).ReverseMap(); 
            CreateMap<Product,ProductUpdateDTO>().ReverseMap();
            CreateMap<RecommendProductDTO, Product>().ReverseMap();

            CreateMap<ProductImage,ProductImageCreateDTO>().ReverseMap();
            CreateMap<ProductImage,ProductImageDTO>().ReverseMap();
            CreateMap<ProductImage,ProductImageUpdateDTO>().ReverseMap();

            CreateMap<ProductVariantValue,ProductVariantValueDTO>().ReverseMap();
            CreateMap<ProductVariantValue,ProductVariantValueCreateDTO>().ReverseMap();
            CreateMap<ProductVariantValue,ProductVariantValueUpdateDTO>().ReverseMap();
            CreateMap<ApplicationUser, UserDTO>().ReverseMap();
            CreateMap<DiscountCode, DiscountCodeDTO>().ReverseMap();
            CreateMap<DeliveryDetail, DeliveryDTO>().ReverseMap();

            CreateMap<CartLine,CartLineDTO>().ForMember(cl=>cl.CartLineItems,opt=>opt.Ignore()).ReverseMap();
            CreateMap<CartLineItem,CartLineItemDTO>().ForMember(cli => cli.Product, opt=>opt.Ignore()).ReverseMap();
            CreateMap<CartLineItem,CartLineItemCreateDTO>().ReverseMap();

            CreateMap<DiscountCode, DiscountCodeCreateDTO>().ReverseMap();
            CreateMap<DiscountCode, DiscountCodeUpdateDTO>().ReverseMap();
            CreateMap<DiscountCode, DiscountCodeDTO>().ReverseMap();

            CreateMap<Payment , PaymentDTO>().ReverseMap();

            CreateMap<Category, CategoryDTO>().ReverseMap();

            CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<Order, OrderCreateDTO>().ReverseMap();


            CreateMap<DeliveryDetail, DeliveryDTO>().ReverseMap();
            CreateMap<DeliveryDetail, AssignCreateDTO>().ReverseMap();
            



        }
    }
}
