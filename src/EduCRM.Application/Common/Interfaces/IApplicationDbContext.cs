using System.Linq.Expressions;

namespace EduCRM.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        Task<TEntity?> FindAsync<TEntity>(Guid id) where TEntity : class;
        Task<TEntity?> FirstOrDefaultAsync<TEntity>(Expression<Func<TEntity, bool>> predicate) where TEntity : class;
        Task<List<TEntity>>ToListAsync<TEntity>(Expression<Func<TEntity, bool>>? predicate = null) where TEntity : class;
        Task AddAsync<TEntity>(TEntity entity) where TEntity : class;
        Task AddRangeAsync<TEntity>(IEnumerable<TEntity> entities) where TEntity : class;
        Task SaveChangesAsync();
    }
}
