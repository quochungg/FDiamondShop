namespace FDiamondShop.API.Repository.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        IProductRepository ProductRepository { get; }
        IProductImageRepository ProductImageRepository { get; }
        IProductVariantValueRepository ProductVariantValueRepository { get; }
        ISubCategoryRepository SubCategoryRepository { get; }
        IUserRepository UserRepository { get; }
        IEmailRepository EmailRepository { get; }
        IVnPayRepository VnPayRepository { get; }
        IMomoRepository MomoRepository { get; }
        ICartRepository CartRepository { get; }
        IDiscountRepository DiscountCodeRepository { get; }
        ICategoryRepository CategoryRepository { get; }
        IPayPalRepository PayPalRepository { get; }        
        IOrderRepository OrderRepository { get; }
        IPaymentRepository PaymentRepository { get; }

        IExchangeRepository ExchangeRepository { get; }


        Task SaveAsync();
    }
}
