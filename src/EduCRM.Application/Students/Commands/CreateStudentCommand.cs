using MediatR;
using FluentValidation;

namespace EduCRM.Application.Students.Commands
{
    public record CreateStudentCommand(string FullName, string PhoneNumber, decimal Balance) : IRequest<Guid>;

    public class CreateStudentCommandValidator : AbstractValidator<CreateStudentCommand>
    {
        public CreateStudentCommandValidator()
        {
            RuleFor(x => x.FullName).NotEmpty().WithMessage("Full name is required");
            RuleFor(x => x.PhoneNumber).NotEmpty().WithMessage("Phone number is required");
        }
    }
}
