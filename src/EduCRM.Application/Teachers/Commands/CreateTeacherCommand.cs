using MediatR;
using FluentValidation;

namespace EduCRM.Application.Teachers.Commands
{
    public record CreateTeacherCommand(string FullName, string PhoneNumber, string Specialization, decimal HourlyRate) : IRequest<Guid>;

    public class CreateTeacherCommandValidator : AbstractValidator<CreateTeacherCommand>
    {
        public CreateTeacherCommandValidator()
        {
            RuleFor(x => x.FullName).NotEmpty().WithMessage("Full name is required");
            RuleFor(x => x.PhoneNumber).NotEmpty().WithMessage("Phone number is required");
        }
    }
}
