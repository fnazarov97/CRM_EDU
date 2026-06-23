using System;
using EduCRM.Domain.Common;

namespace EduCRM.Domain.Entities.Payments
{
    public class Transaction : BaseEntity
    {
        public Guid InvoiceId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public Invoice? Invoice { get; set; }
    }
}
