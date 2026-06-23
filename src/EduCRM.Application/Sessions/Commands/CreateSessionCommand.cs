using MediatR;
using FluentValidation;

namespace EduCRM.Application.Sessions.Commands
{
    public record CreateSessionCommand(Guid GroupId, DateTime Date, string Topic, string? Homework) : IRequest<Guid>;

    public class CreateSessionCommandValidator : AbstractValidator<CreateSessionCommand>
    {
        public CreateSessionCommandValidator()
        {
            RuleFor(x => x.GroupId).NotEmpty().WithMessage("Group is required");
            RuleFor(x => x.Topic).NotEmpty().WithMessage("Topic is required");
        }
    }
}
