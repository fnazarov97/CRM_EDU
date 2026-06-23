using System;
using EduCRM.Domain.Common;

namespace EduCRM.Domain.Entities.Courses
{
    public class Course : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public decimal Price { get; set; } = 0;
        public int DurationMonths { get; set; } = 0;
        public string Description { get; set; } = string.Empty;
    }
}
