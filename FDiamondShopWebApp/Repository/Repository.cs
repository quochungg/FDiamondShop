using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using FDiamondShop.API.Repository.IRepository;
using FDiamondShop.API.Data;


namespace FDiamondShopWebApp.Repository
{

    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly FDiamondContext _db;
        internal DbSet<T> dbSet;


        public Repository(FDiamondContext db)
        {
            _db = db;
            this.dbSet = _db.Set<T>();
        }


        //public async Task CreateAsync(T entity)
        //{
        //    await dbSet.AddAsync(entity);

        //}

        public async Task<T> GetAsync(Expression<Func<T, bool>>? filter = null, bool tracked = true)
        {
            IQueryable<T> query = dbSet;
            if (!tracked)
            {
                query = query.AsNoTracking();
            }
            if (filter != null)
            {
                query = query.Where(filter);
            }

            return await query.FirstOrDefaultAsync();
        }

        public async Task<List<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null)
        {
            IQueryable<T> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            return await query.ToListAsync();
        }

        public async Task RemoveAsync(T entity)
        {
            dbSet.Remove(entity);

        }

        public Task<List<T>> PartialGet(int pageNumber)
        {
            throw new NotImplementedException();
        }
    }
}
