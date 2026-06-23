using MediatR;
using EduCRM.Application.Common.Interfaces;
using EduCRM.Domain.Entities.Payments;
using EduCRM.Domain.Entities.Students;

namespace EduCRM.Application.Payments.Queries
{
    public class GetInvoicesQueryHandler : IRequestHandler<GetInvoicesQuery, List<InvoiceDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetInvoicesQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<InvoiceDto>> Handle(GetInvoicesQuery request, CancellationToken cancellationToken)
        {
            var invoices = await _context.ToListAsync<Invoice>();
            var students = await _context.ToListAsync<Student>();

            return invoices
                .OrderByDescending(i => i.CreatedAt)
                .Select(i => new InvoiceDto(
                    i.Id,
                    i.StudentId,
                    students.FirstOrDefault(s => s.Id == i.StudentId)?.FullName ?? "",
                    i.Amount,
                    i.PaidAmount,
                    i.RemainingAmount,
                    i.DueDate,
                    i.Status,
                    i.Description))
                .ToList();
        }
    }
}
