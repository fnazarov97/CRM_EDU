using System;
using EduCRM.Domain.Common;

namespace EduCRM.Domain.Entities.Leads
{
    public class Lead : BaseEntity
    {
        public string FullName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Source { get; set; } = string.Empty;
        public string Status { get; set; } = "Yangi";
        public string Notes { get; set; } = string.Empty;
    }
}
