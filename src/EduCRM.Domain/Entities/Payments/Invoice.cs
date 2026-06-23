using System;
using EduCRM.Domain.Common;

namespace EduCRM.Domain.Entities.Payments
{
    public class Invoice : BaseEntity
    {
        public Guid StudentId { get; set; }
        public decimal Amount { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal RemainingAmount { get; set; }
        public DateTime DueDate { get; set; }
        public string Status { get; set; } = "To'lanmagan";
        public string? Description { get; set; }
    }
}
