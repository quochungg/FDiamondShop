using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;

namespace FDiamondShop.API.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        public FDiamondContext _db { get; }
        public IProductRepository ProductRepository { get; }
        public IProductImageRepository ProductImageRepository { get; }
        public IProductVariantValueRepository ProductVariantValueRepository { get; }
        public IUserRepository UserRepository { get; }
        public IEmailRepository EmailRepository { get; }
        public IDiscountRepository DiscountRepository { get; }
        public IVnPayRepository VnPayRepository { get; }        
        public IMomoRepository MomoRepository { get; }
        public IDiscountRepository DiscountCodeRepository { get; }
        public ICartRepository CartRepository { get; }

        public UnitOfWork(FDiamondContext db, IProductRepository productRepository, IProductImageRepository productImageRepository, 
            IProductVariantValueRepository productVariantValueRepository, IUserRepository userRepository, 
            IEmailRepository emailRepository, IDiscountRepository discountRepository, IVnPayRepository vnPayRepository, ICartRepository cartRepository,
            IMomoRepository momoRepository)
        {
            _db = db;
            ProductRepository = productRepository;
            ProductImageRepository = productImageRepository;
            ProductVariantValueRepository = productVariantValueRepository;
            UserRepository = userRepository;
            EmailRepository = emailRepository;
            VnPayRepository = vnPayRepository;
            DiscountCodeRepository = discountRepository;
            CartRepository = cartRepository;
            MomoRepository = momoRepository;
        }
        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }
        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}

