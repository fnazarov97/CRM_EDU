using MediatR;
using EduCRM.Application.Common.Interfaces;
using EduCRM.Domain.Entities.Attendance;
using EduCRM.Domain.Entities.Courses;

namespace EduCRM.Application.Sessions.Queries
{
    public class GetSessionsQueryHandler : IRequestHandler<GetSessionsQuery, List<SessionDto>>
    {
        private readonly IApplicationDbContext _context;

        public GetSessionsQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<SessionDto>> Handle(GetSessionsQuery request, CancellationToken cancellationToken)
        {
            var sessions = await _context.ToListAsync<Session>();
            var groups = await _context.ToListAsync<Group>();

            return sessions
                .OrderByDescending(s => s.Date)
                .Select(s => new SessionDto(
                    s.Id,
                    s.GroupId,
                    groups.FirstOrDefault(g => g.Id == s.GroupId)?.Name ?? "",
                    s.Date,
                    s.Topic,
                    s.Homework))
                .ToList();
        }
    }
}
