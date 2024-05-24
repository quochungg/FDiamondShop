using FDiamondShop.API.Data;
using FDiamondShop.API.Models;
using FDiamondShop.API.Repository.IRepository;

namespace FDiamondShopWebApp.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        public FDiamondContext _db { get; }
        public IProductRepository ProductRepository { get; }


        public UnitOfWork(FDiamondContext db, IProductRepository productRepository)
        {
            _db = db;
            ProductRepository = productRepository;
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

        public Task Save()
        {
            throw new NotImplementedException();
        }
    }
}

