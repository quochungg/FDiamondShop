using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using FDiamondShop.API.Repository.IRepository;
using FDiamondShop.API.Data;


namespace FDiamondShop.API.Repository
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


        public async Task<T> CreateAsync(T entity)
        {
            var create = await dbSet.AddAsync(entity);
            
            return create.Entity;

        }

        public async Task<T> GetAsync(Expression<Func<T, bool>>? filter = null, bool tracked = true, string? includeProperties = null)
        {
            IQueryable<T> query = dbSet;
            if (!tracked)
            {
                query = query.AsNoTracking();
            }
            if (includeProperties != null)
            {
                foreach (var includeProp in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProp.Trim());
                }
            }
            if (filter != null)
            {
                query = query.Where(filter);
            }

            return await query.FirstOrDefaultAsync();
        }

        public async Task<List<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null, string? includeProperties = null)
        {
            IQueryable<T> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }
            if (includeProperties != null)
            {
                foreach (var includeProp in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProp.Trim());
                }
            }

            return await query.ToListAsync();
        }

        public async Task<T> RemoveAsync(T entity)
        {
            var Remove =  dbSet.Remove(entity);

            return Remove.Entity;
        }
        
    }
}
