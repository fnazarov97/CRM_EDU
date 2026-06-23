using MediatR;
using EduCRM.Application.Common.Interfaces;
using EduCRM.Domain.Entities.Courses;

namespace EduCRM.Application.Groups.Commands
{
    public class CreateGroupCommandHandler : IRequestHandler<CreateGroupCommand, Guid>
    {
        private readonly IApplicationDbContext _context;

        public CreateGroupCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(CreateGroupCommand request, CancellationToken cancellationToken)
        {
            var group = new Group
            {
                Name = request.Name,
                CourseId = request.CourseId,
                TeacherId = request.TeacherId,
                Schedule = request.Schedule,
                MaxStudents = request.MaxStudents,
                CurrentStudents = 0,
                Status = "Faol"
            };

            await _context.AddAsync(group);
            await _context.SaveChangesAsync();

            return group.Id;
        }
    }
}
