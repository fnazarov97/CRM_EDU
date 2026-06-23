using MediatR;
using FluentValidation;

namespace EduCRM.Application.Payments.Commands
{
    public record CreateInvoiceCommand(Guid StudentId, decimal Amount, DateTime DueDate, string? Description) : IRequest<Guid>;

    public class CreateInvoiceCommandValidator : AbstractValidator<CreateInvoiceCommand>
    {
        public CreateInvoiceCommandValidator()
        {
            RuleFor(x => x.StudentId).NotEmpty().WithMessage("Student is required");
            RuleFor(x => x.Amount).GreaterThan(0).WithMessage("Amount must be greater than 0");
        }
    }
}
