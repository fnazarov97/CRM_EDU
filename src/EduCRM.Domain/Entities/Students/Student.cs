using System;
using EduCRM.Domain.Common;

namespace EduCRM.Domain.Entities.Students
{
    public class Student : BaseEntity
    {
        public string FullName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public decimal Balance { get; set; } = 0;
        public string Status { get; set; } = "Faol";
    }
}
