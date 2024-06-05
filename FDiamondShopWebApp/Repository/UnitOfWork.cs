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
        public IShoppingCartRepository ShoppingCartRepository { get; }
        public IDiscountRepository DiscountRepository { get; }

        public UnitOfWork(FDiamondContext db, IProductRepository productRepository, IProductImageRepository productImageRepository, 
            IProductVariantValueRepository productVariantValueRepository, IUserRepository userRepository, 
            IEmailRepository emailRepository, IDiscountRepository discountRepository)
        {
            _db = db;
            ProductRepository = productRepository;
            ProductImageRepository = productImageRepository;
            ProductVariantValueRepository = productVariantValueRepository;
            UserRepository = userRepository;
            EmailRepository = emailRepository;
            DiscountRepository = discountRepository;
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

