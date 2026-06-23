using EduCRM.Application.Common.Interfaces;
using EduCRM.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace EduCRM.Infrastructure.Persistence
{
    public class ApplicationDbContext : IApplicationDbContext
    {
        private readonly CrmDbContext _context;

        public ApplicationDbContext(CrmDbContext context)
        {
            _context = context;
        }

        public async Task<TEntity?> FindAsync<TEntity>(Guid id) where TEntity : class
        {
            return await _context.Set<TEntity>().FindAsync(id);
        }

        public async Task<TEntity?> FirstOrDefaultAsync<TEntity>(Expression<Func<TEntity, bool>> predicate) where TEntity : class
        {
            return await _context.Set<TEntity>().FirstOrDefaultAsync(predicate);
        }

        public async Task<List<TEntity>>ToListAsync<TEntity>(Expression<Func<TEntity, bool>>? predicate = null) where TEntity : class
        {
            var query = _context.Set<TEntity>().AsQueryable();
            if (predicate != null)
            {
                query = query.Where(predicate);
            }
            return await query.ToListAsync();
        }

        public async Task AddAsync<TEntity>(TEntity entity) where TEntity : class
        {
            await _context.Set<TEntity>().AddAsync(entity);
        }

        public async Task AddRangeAsync<TEntity>(IEnumerable<TEntity> entities) where TEntity : class
        {
            await _context.Set<TEntity>().AddRangeAsync(entities);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public CrmDbContext DbContext => _context;
    }
}
