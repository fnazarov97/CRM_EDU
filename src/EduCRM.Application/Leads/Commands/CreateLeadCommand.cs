using MediatR;
using FluentValidation;

namespace EduCRM.Application.Leads.Commands
{
    public record CreateLeadCommand(string FullName, string PhoneNumber, string Source, string Notes) : IRequest<Guid>;

    public class CreateLeadCommandValidator : AbstractValidator<CreateLeadCommand>
    {
        public CreateLeadCommandValidator()
        {
            RuleFor(x => x.FullName).NotEmpty().WithMessage("Full name is required");
            RuleFor(x => x.PhoneNumber).NotEmpty().WithMessage("Phone number is required");
            RuleFor(x => x.Source).NotEmpty().WithMessage("Source is required");
        }
    }
}
