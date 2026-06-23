using MediatR;
using FluentValidation;

namespace EduCRM.Application.Auth.Commands
{
    public record RefreshTokenCommand(string RefreshToken) : IRequest<LoginResponse>;

    public class RefreshTokenCommandValidator : AbstractValidator<RefreshTokenCommand>
    {
        public RefreshTokenCommandValidator()
        {
            RuleFor(x => x.RefreshToken).NotEmpty().WithMessage("Refresh token is required");
        }
    }
}
