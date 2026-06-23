using MediatR;
using EduCRM.Application.Common.Interfaces;
using EduCRM.Domain.Entities.Teachers;

namespace EduCRM.Application.Teachers.Queries
{
    public class GetTeachersQueryHandler : IRequestHandler<GetTeachersQuery, List<TeacherDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetTeachersQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<TeacherDto>> Handle(GetTeachersQuery request, CancellationToken cancellationToken)
        {
            var teachers = await _context.ToListAsync<Teacher>();

            return teachers
                .OrderByDescending(t => t.CreatedAt)
                .Select(t => new TeacherDto(t.Id, t.FullName, t.PhoneNumber, t.Specialization, t.HourlyRate, t.Status))
                .ToList();
        }
    }
}
