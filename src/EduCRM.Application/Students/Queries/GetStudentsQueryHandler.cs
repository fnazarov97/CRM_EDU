using MediatR;
using EduCRM.Application.Common.Interfaces;
using EduCRM.Domain.Entities.Students;

namespace EduCRM.Application.Students.Queries
{
    public class GetStudentsQueryHandler : IRequestHandler<GetStudentsQuery, List<StudentDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetStudentsQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<StudentDto>> Handle(GetStudentsQuery request, CancellationToken cancellationToken)
        {
            var students = await _context.ToListAsync<Domain.Entities.Students.Student>();

            return students
                .OrderByDescending(s => s.CreatedAt)
                .Select(s => new StudentDto(
                    s.Id,
                    s.FullName,
                    s.PhoneNumber,
                    s.Balance,
                    s.Status,
                    s.CreatedAt
                ))
                .ToList();
        }
    }
}
