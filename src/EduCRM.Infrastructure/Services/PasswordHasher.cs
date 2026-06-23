using System.Security.Cryptography;
using EduCRM.Application.Common.Interfaces;

namespace EduCRM.Infrastructure.Services
{
    public class PasswordHasher : IPasswordHasher
    {
        private const int SaltSize = 128 / 8;
        private const int KeySize = 256 / 8;
        private const int Iterations = 10000;
        private static readonly HashAlgorithmName _hashAlgorithmName = HashAlgorithmName.SHA256;
        private const char Delimiter = ';';

        public string HashPassword(string password)
        {
            var salt = RandomNumberGenerator.GetBytes(SaltSize);
            var hash = new Rfc2898DeriveBytes(password, salt, Iterations, _hashAlgorithmName);
            var hashBytes = hash.GetBytes(KeySize);

            return string.Join(Delimiter, Convert.ToBase64String(salt), Convert.ToBase64String(hashBytes));
        }

        public bool VerifyPassword(string password, string hash)
        {
            var parts = hash.Split(Delimiter);
            if (parts.Length != 2)
            {
                return false;
            }

            var salt = Convert.FromBase64String(parts[0]);
            var hashBytes = Convert.FromBase64String(parts[1]);

            var newHash = new Rfc2898DeriveBytes(password, salt, Iterations, _hashAlgorithmName);
            var newHashBytes = newHash.GetBytes(KeySize);

            return CryptographicOperations.FixedTimeEquals(hashBytes, newHashBytes);
        }
    }
}
