using MediatR;
using EduCRM.Application.Common.Interfaces;
using EduCRM.Domain.Entities.Leads;

namespace EduCRM.Application.Leads.Commands
{
    public class CreateLeadCommandHandler : IRequestHandler<CreateLeadCommand, Guid>
    {
        private readonly IApplicationDbContext _context;

        public CreateLeadCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(CreateLeadCommand request, CancellationToken cancellationToken)
        {
            var lead = new Lead
            {
                FullName = request.FullName,
                PhoneNumber = request.PhoneNumber,
                Source = request.Source,
                Notes = request.Notes,
                Status = "Yangi"
            };

            await _context.AddAsync(lead);
            await _context.SaveChangesAsync();

            return lead.Id;
        }
    }
}
