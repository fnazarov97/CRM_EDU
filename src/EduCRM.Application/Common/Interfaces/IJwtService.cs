namespace EduCRM.Application.Common.Interfaces
{
    public interface IJwtService
    {
        string GenerateAccessToken(string username, string role);
        string GenerateRefreshToken();
        bool ValidateToken(string token);
    }
}
