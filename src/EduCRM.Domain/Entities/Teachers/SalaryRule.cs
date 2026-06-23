using System;
using EduCRM.Domain.Common;

namespace EduCRM.Domain.Entities.Teachers
{
    public class SalaryRule : BaseEntity
    {
        public Guid TeacherId { get; set; }
        public string RuleType { get; set; } = string.Empty;
        public decimal Rate { get; set; }
        public string? Description { get; set; }
        public Teacher? Teacher { get; set; }
    }
}
