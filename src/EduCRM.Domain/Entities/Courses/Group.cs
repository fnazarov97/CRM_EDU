using System;
using EduCRM.Domain.Common;

namespace EduCRM.Domain.Entities.Courses
{
    public class Group : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public Guid CourseId { get; set; }
        public Course? Course { get; set; }
        public Guid TeacherId { get; set; }
        public string Schedule { get; set; } = string.Empty;
        public int MaxStudents { get; set; } = 20;
        public int CurrentStudents { get; set; } = 0;
        public string Status { get; set; } = "Faol";
    }
}
