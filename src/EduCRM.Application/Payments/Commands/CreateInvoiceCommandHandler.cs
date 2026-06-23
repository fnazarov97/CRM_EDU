using MediatR;
using EduCRM.Application.Common.Interfaces;
using EduCRM.Domain.Entities.Payments;

namespace EduCRM.Application.Payments.Commands
{
    public class CreateInvoiceCommandHandler : IRequestHandler<CreateInvoiceCommand, Guid>
    {
        private readonly IApplicationDbContext _context;

        public CreateInvoiceCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(CreateInvoiceCommand request, CancellationToken cancellationToken)
        {
            var invoice = new Invoice
            {
                StudentId = request.StudentId,
                Amount = request.Amount,
                PaidAmount = 0,
                RemainingAmount = request.Amount,
                DueDate = request.DueDate,
                Status = "To'lanmagan",
                Description = request.Description
            };

            await _context.AddAsync(invoice);
            await _context.SaveChangesAsync();

            return invoice.Id;
        }
    }
}
