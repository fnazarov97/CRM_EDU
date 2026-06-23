using System;
using EduCRM.Domain.Common;

namespace EduCRM.Domain.Entities.Identity
{
    public class RefreshToken : BaseEntity
    {
        public string Token { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }
        public bool IsUsed { get; set; } = false;
        public Guid UserId { get; set; }
        public User? User { get; set; }
    }
}
