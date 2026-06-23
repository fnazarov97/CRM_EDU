using System;
using EduCRM.Domain.Common;

namespace EduCRM.Domain.Entities.Students
{
    public class Parent : BaseEntity
    {
        public string FullName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Relation { get; set; } = string.Empty;
        public Guid StudentId { get; set; }
        public Student? Student { get; set; }
    }
}
