using MediatR;
using FluentValidation;

namespace EduCRM.Application.Courses.Commands
{
    public record CreateCourseCommand(string Title, decimal Price, int DurationMonths, string Description) : IRequest<Guid>;

    public class CreateCourseCommandValidator : AbstractValidator<CreateCourseCommand>
    {
        public CreateCourseCommandValidator()
        {
            RuleFor(x => x.Title).NotEmpty().WithMessage("Title is required");
            RuleFor(x => x.Price).GreaterThanOrEqualTo(0).WithMessage("Price must be non-negative");
            RuleFor(x => x.DurationMonths).GreaterThan(0).WithMessage("Duration must be greater than 0");
        }
    }
}
