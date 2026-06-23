using System;
using EduCRM.Domain.Common;

namespace EduCRM.Domain.Entities.Teachers
{
    public class Teacher : BaseEntity
    {
        public string FullName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Specialization { get; set; } = string.Empty;
        public decimal HourlyRate { get; set; }
        public string Status { get; set; } = "Faol";
    }
}
