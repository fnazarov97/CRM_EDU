using MediatR;
using FluentValidation;

namespace EduCRM.Application.Auth.Commands
{
    public record LoginCommand(string Username, string Password) : IRequest<LoginResponse>;

    public record LoginResponse(string AccessToken, string RefreshToken, string Username, string Role);

    public class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        public LoginCommandValidator()
        {
            RuleFor(x => x.Username).NotEmpty().WithMessage("Username is required");
            RuleFor(x => x.Password).NotEmpty().WithMessage("Password is required");
        }
    }
}
