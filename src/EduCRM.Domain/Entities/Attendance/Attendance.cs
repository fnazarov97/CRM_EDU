using System;
using EduCRM.Domain.Common;

namespace EduCRM.Domain.Entities.Attendance
{
    public class Attendance : BaseEntity
    {
        public Guid StudentId { get; set; }
        public Guid SessionId { get; set; }
        public bool IsPresent { get; set; }
        public string? Notes { get; set; }
        public Session? Session { get; set; }
    }
}
