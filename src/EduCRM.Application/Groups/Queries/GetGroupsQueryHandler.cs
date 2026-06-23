using MediatR;
using EduCRM.Application.Common.Interfaces;
using EduCRM.Domain.Entities.Courses;
using EduCRM.Domain.Entities.Teachers;

namespace EduCRM.Application.Groups.Queries
{
    public class GetGroupsQueryHandler : IRequestHandler<GetGroupsQuery, List<GroupDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetGroupsQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<GroupDto>> Handle(GetGroupsQuery request, CancellationToken cancellationToken)
        {
            var groups = await _context.ToListAsync<Group>();
            var courses = await _context.ToListAsync<Course>();
            var teachers = await _context.ToListAsync<Teacher>();

            return groups
                .OrderByDescending(g => g.CreatedAt)
                .Select(g => new GroupDto(
                    g.Id,
                    g.Name,
                    g.CourseId,
                    courses.FirstOrDefault(c => c.Id == g.CourseId)?.Title ?? "",
                    g.TeacherId,
                    teachers.FirstOrDefault(t => t.Id == g.TeacherId)?.FullName ?? "",
                    g.Schedule,
                    g.MaxStudents,
                    g.CurrentStudents,
                    g.Status))
                .ToList();
        }
    }
}
