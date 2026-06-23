using MediatR;
using EduCRM.Application.Common.Interfaces;
using EduCRM.Domain.Entities.Courses;

namespace EduCRM.Application.Courses.Commands
{
    public class CreateCourseCommandHandler : IRequestHandler<CreateCourseCommand, Guid>
    {
        private readonly IApplicationDbContext _context;

        public CreateCourseCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(CreateCourseCommand request, CancellationToken cancellationToken)
        {
            var course = new Course
            {
                Title = request.Title,
                Price = request.Price,
                DurationMonths = request.DurationMonths,
                Description = request.Description
            };

            await _context.AddAsync(course);
            await _context.SaveChangesAsync();

            return course.Id;
        }
    }
}
