using MediatR;
using FluentValidation;

namespace EduCRM.Application.Groups.Commands
{
    public record CreateGroupCommand(string Name, Guid CourseId, Guid TeacherId, string Schedule, int MaxStudents) : IRequest<Guid>;

    public class CreateGroupCommandValidator : AbstractValidator<CreateGroupCommand>
    {
        public CreateGroupCommandValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required");
            RuleFor(x => x.CourseId).NotEmpty().WithMessage("Course is required");
            RuleFor(x => x.TeacherId).NotEmpty().WithMessage("Teacher is required");
            RuleFor(x => x.MaxStudents).GreaterThan(0).WithMessage("Max students must be greater than 0");
        }
    }
}
