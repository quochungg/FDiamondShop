namespace FDiamondShop.API.Repository.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        IProductRepository ProductRepository { get; }
        IProductImageRepository ProductImageRepository { get; }
        IProductVariantValueRepository ProductVariantValueRepository { get; }
        IUserRepository UserRepository { get; }
        IEmailRepository EmailRepository { get; }
        IDiscountRepository DiscountRepository { get; }
        IVnPayRepository VnPayRepository { get; }
        IMomoRepository MomoRepository { get; }
        ICartRepository CartRepository { get; }
        IDiscountRepository DiscountCodeRepository { get; }
        
        IPayPalRepository PayPalRepository { get; }
        Task SaveAsync();
    }
}
