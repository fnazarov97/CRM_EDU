using MediatR;
using EduCRM.Application.Common.Interfaces;
using EduCRM.Domain.Entities.Teachers;

namespace EduCRM.Application.Teachers.Commands
{
    public class CreateTeacherCommandHandler : IRequestHandler<CreateTeacherCommand, Guid>
    {
        private readonly IApplicationDbContext _context;

        public CreateTeacherCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(CreateTeacherCommand request, CancellationToken cancellationToken)
        {
            var teacher = new Teacher
            {
                FullName = request.FullName,
                PhoneNumber = request.PhoneNumber,
                Specialization = request.Specialization,
                HourlyRate = request.HourlyRate,
                Status = "Faol"
            };

            await _context.AddAsync(teacher);
            await _context.SaveChangesAsync();

            return teacher.Id;
        }
    }
}
