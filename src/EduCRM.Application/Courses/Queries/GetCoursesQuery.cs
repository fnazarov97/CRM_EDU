using MediatR;

namespace EduCRM.Application.Courses.Queries
{
    public record GetCoursesQuery() : IRequest<List<CourseDto>>;

    public record CourseDto(Guid Id, string Title, decimal Price, int DurationMonths, string Description);
}
