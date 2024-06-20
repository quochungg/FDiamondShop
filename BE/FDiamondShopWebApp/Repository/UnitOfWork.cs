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
        public ISubCategoryRepository SubCategoryRepository { get; }
        public IUserRepository UserRepository { get; }
        public IEmailRepository EmailRepository { get; }
        public IDiscountRepository DiscountRepository { get; }
        public IVnPayRepository VnPayRepository { get; }        
        public IMomoRepository MomoRepository { get; }
        public IDiscountRepository DiscountCodeRepository { get; }
        public ICartRepository CartRepository { get; }
        public IPayPalRepository PayPalRepository { get; }
        public ICategoryRepository CategoryRepository { get; }
        public IOrderRepository OrderRepository { get; }
        public IPaymentRepository PaymentRepository { get; }
        public IExchangeRepository ExchangeRepository { get; }
        public IDashboardRepository DashboardRepository { get; }
        public UnitOfWork(FDiamondContext db, 
            IProductRepository productRepository, 
            IProductImageRepository productImageRepository, 
            IProductVariantValueRepository productVariantValueRepository, 
            ISubCategoryRepository subCategoryRepository, 
            IUserRepository userRepository, 
            IEmailRepository emailRepository, 
            IDiscountRepository discountRepository, 
            IVnPayRepository vnPayRepository, 
            ICartRepository cartRepository,
            IMomoRepository momoRepository,
            IOrderRepository orderRepository,
            IPaymentRepository paymentRepository,
            ICategoryRepository categoryRepository,
            IPayPalRepository payPalRepository,
            IExchangeRepository exchangeRepository
            )
        {
            _db = db;
            ProductRepository = productRepository;
            ProductImageRepository = productImageRepository;
            ProductVariantValueRepository = productVariantValueRepository;
            SubCategoryRepository = subCategoryRepository;
            UserRepository = userRepository;
            EmailRepository = emailRepository;
            VnPayRepository = vnPayRepository;
            DiscountCodeRepository = discountRepository;
            CartRepository = cartRepository;
            MomoRepository = momoRepository;
            CategoryRepository = categoryRepository;
            PayPalRepository = payPalRepository;
            OrderRepository = orderRepository;
            PaymentRepository = paymentRepository;
            ExchangeRepository = exchangeRepository;    
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

