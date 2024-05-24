using FDiamondShopWebApp.Data;
using FDiamondShopWebApp.Models;
using FDiamondShopWebApp.Repository.IRepository;

namespace FDiamondShopWebApp.Repository
{
    public class UnitOfWork : IDisposable
    {
        public FDiamondContext _db { get; }
        public IRepository<Category> CategoryRepository { get; }
        public IRepository<Product> ProductRepository { get; }
        public UnitOfWork(FDiamondContext db, IRepository<Category> repository, IRepository<Product> productRepository)
        {
            _db = db;
            CategoryRepository = repository;
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
    }
}

