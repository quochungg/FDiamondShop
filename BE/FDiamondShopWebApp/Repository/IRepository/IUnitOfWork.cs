﻿using Microsoft.EntityFrameworkCore.Storage;

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
        IDashboardRepository DashboardRepository { get; }
        IDeliveryRepository DeliveryRepository { get; }
        //IDeliveryDetailRepository DeliveryDetailRepository { get; }
        IWarrantyRepository WarrantyRepository { get; }

        Task<IDbContextTransaction> BeginTransactionAsync();
        Task SaveAsync();
    }
}
