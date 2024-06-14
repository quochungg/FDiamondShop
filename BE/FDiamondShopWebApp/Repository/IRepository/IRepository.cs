using FDiamondShop.API.Models;
using System.Linq.Expressions;


namespace FDiamondShop.API.Repository.IRepository
{
    public interface IRepository<T> where T : class
    {
        Task<List<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null, string? includeProperties = null);
        Task<T> GetAsync(Expression<Func<T, bool>>? filter = null, bool tracked = true, string? includeProperties = null);
        Task<T> RemoveAsync(T entity);
        Task<T> CreateAsync(T entity);

    }
}
