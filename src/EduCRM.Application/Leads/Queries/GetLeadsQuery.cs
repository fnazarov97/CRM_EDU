using MediatR;

namespace EduCRM.Application.Leads.Queries
{
    public record GetLeadsQuery() : IRequest<List<LeadDto>>;

    public record LeadDto(Guid Id, string FullName, string PhoneNumber, string Source, string Status, string Notes, DateTime CreatedAt);
}
