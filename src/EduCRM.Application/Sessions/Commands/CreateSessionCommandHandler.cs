using MediatR;
using EduCRM.Application.Common.Interfaces;
using EduCRM.Domain.Entities.Attendance;

namespace EduCRM.Application.Sessions.Commands
{
    public class CreateSessionCommandHandler : IRequestHandler<CreateSessionCommand, Guid>
    {
        private readonly IApplicationDbContext _context;

        public CreateSessionCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(CreateSessionCommand request, CancellationToken cancellationToken)
        {
            var session = new Session
            {
                GroupId = request.GroupId,
                Date = request.Date,
                Topic = request.Topic,
                Homework = request.Homework
            };

            await _context.AddAsync(session);
            await _context.SaveChangesAsync();

            return session.Id;
        }
    }
}
