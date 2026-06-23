using MediatR;
using EduCRM.Application.Common.Interfaces;
using EduCRM.Domain.Entities.Courses;

namespace EduCRM.Application.Courses.Queries
{
    public class GetCoursesQueryHandler : IRequestHandler<GetCoursesQuery, List<CourseDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetCoursesQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<CourseDto>> Handle(GetCoursesQuery request, CancellationToken cancellationToken)
        {
            var courses = await _context.ToListAsync<Course>();

            return courses
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new CourseDto(c.Id, c.Title, c.Price, c.DurationMonths, c.Description))
                .ToList();
        }
    }
}
