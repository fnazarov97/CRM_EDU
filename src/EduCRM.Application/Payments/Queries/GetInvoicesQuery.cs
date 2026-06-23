using MediatR;

namespace EduCRM.Application.Payments.Queries
{
    public record GetInvoicesQuery() : IRequest<List<InvoiceDto>>;

    public record InvoiceDto(
        Guid Id,
        Guid StudentId,
        string StudentName,
        decimal Amount,
        decimal PaidAmount,
        decimal RemainingAmount,
        DateTime DueDate,
        string Status,
        string? Description);
}
