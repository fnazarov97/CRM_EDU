using System;
using EduCRM.Domain.Common;

namespace EduCRM.Domain.Entities.Courses
{
    public class Classroom : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public int Capacity { get; set; } = 30;
        public string Equipment { get; set; } = string.Empty;
    }
}
