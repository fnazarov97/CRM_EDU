using MediatR;
using EduCRM.Application.Common.Interfaces;
using EduCRM.Domain.Entities.Identity;

namespace EduCRM.Application.Auth.Commands
{
    public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, LoginResponse>
    {
        private readonly IApplicationDbContext _context;
        private readonly IJwtService _jwtService;

        public RefreshTokenCommandHandler(IApplicationDbContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        public async Task<LoginResponse> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            var refreshToken = await _context.FirstOrDefaultAsync<Domain.Entities.Identity.RefreshToken>(
                rt => rt.Token == request.RefreshToken && !rt.IsUsed && rt.ExpiresAt > DateTime.UtcNow);

            if (refreshToken == null)
            {
                throw new UnauthorizedAccessException("Invalid or expired refresh token");
            }

            refreshToken.IsUsed = true;
            var newAccessToken = _jwtService.GenerateAccessToken("user", "Admin");
            var newRefreshToken = _jwtService.GenerateRefreshToken();

            var newRefreshTokenEntity = new RefreshToken
            {
                Token = newRefreshToken,
                ExpiresAt = DateTime.UtcNow.AddDays(30),
                UserId = refreshToken.UserId
            };

            await _context.AddAsync(newRefreshTokenEntity);
            await _context.SaveChangesAsync();

            return new LoginResponse(newAccessToken, newRefreshToken, "user", "Admin");
        }
    }
}
