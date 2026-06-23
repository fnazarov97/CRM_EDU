using System;
using EduCRM.Domain.Common;

namespace EduCRM.Domain.Entities.Attendance
{
    public class Session : BaseEntity
    {
        public Guid GroupId { get; set; }
        public DateTime Date { get; set; }
        public string Topic { get; set; } = string.Empty;
        public string? Homework { get; set; }
    }
}
