using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

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
        public IDeliveryRepository DeliveryRepository { get; }
        public IDeliveryDetailRepository DeliveryDetailRepository { get; }
        public IWarrantyRepository WarrantyRepository { get; }

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
            IExchangeRepository exchangeRepository,
            IDashboardRepository dashboardRepository,
            IDeliveryRepository deliveryRepository,           
            IDeliveryDetailRepository deliveryDetailRepository,
            IWarrantyRepository warrantyRepository

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
            DashboardRepository = dashboardRepository;
            DeliveryRepository = deliveryRepository;
            DeliveryDetailRepository = deliveryDetailRepository;
            WarrantyRepository = warrantyRepository;


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
        public async Task<IDbContextTransaction> BeginTransactionAsync()
        {
            return await _db.Database.BeginTransactionAsync();
        }



        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}

