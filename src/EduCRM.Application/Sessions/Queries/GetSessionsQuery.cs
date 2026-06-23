using MediatR;

namespace EduCRM.Application.Sessions.Queries
{
    public record GetSessionsQuery() : IRequest<List<SessionDto>>;

    public record SessionDto(
        Guid Id,
        Guid GroupId,
        string GroupName,
        DateTime Date,
        string Topic,
        string? Homework);
}
