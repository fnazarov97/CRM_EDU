using MediatR;

namespace EduCRM.Application.Groups.Queries
{
    public record GetGroupsQuery() : IRequest<List<GroupDto>>;

    public record GroupDto(
        Guid Id,
        string Name,
        Guid CourseId,
        string CourseTitle,
        Guid TeacherId,
        string TeacherName,
        string Schedule,
        int MaxStudents,
        int CurrentStudents,
        string Status);
}
