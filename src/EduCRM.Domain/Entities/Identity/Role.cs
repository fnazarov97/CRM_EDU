using System;
using EduCRM.Domain.Common;

namespace EduCRM.Domain.Entities.Identity
{
    public class Role : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
