using MediatR;
using EduCRM.Application.Common.Interfaces;
using EduCRM.Domain.Entities.Leads;

namespace EduCRM.Application.Leads.Queries
{
    public class GetLeadsQueryHandler : IRequestHandler<GetLeadsQuery, List<LeadDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetLeadsQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<LeadDto>> Handle(GetLeadsQuery request, CancellationToken cancellationToken)
        {
            var leads = await _context.ToListAsync<Domain.Entities.Leads.Lead>();

            return leads
                .OrderByDescending(l => l.CreatedAt)
                .Select(l => new LeadDto(
                    l.Id,
                    l.FullName,
                    l.PhoneNumber,
                    l.Source,
                    l.Status,
                    l.Notes,
                    l.CreatedAt
                ))
                .ToList();
        }
    }
}
