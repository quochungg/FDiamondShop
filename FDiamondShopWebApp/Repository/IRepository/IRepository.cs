using FDiamondShop.API.Models;
using System.Linq.Expressions;


namespace FDiamondShop.API.Repository.IRepository
{
    public interface IRepository<T> where T : class
    {
        Task<List<T>> GetAllAsync(Expression<Func<T, bool>>? filter = null);
        Task<T> GetAsync(Expression<Func<T, bool>>? filter = null, bool tracked = true);
        Task<T> RemoveAsync(T entity);
        Task<List<T>> PartialGet(int pageNumber);
        Task<T> CreateAsync(T entity);

    }
}
