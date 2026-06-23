using MediatR;
using EduCRM.Application.Common.Interfaces;
using EduCRM.Domain.Entities.Students;

namespace EduCRM.Application.Students.Commands
{
    public class CreateStudentCommandHandler : IRequestHandler<CreateStudentCommand, Guid>
    {
        private readonly IApplicationDbContext _context;

        public CreateStudentCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(CreateStudentCommand request, CancellationToken cancellationToken)
        {
            var student = new Student
            {
                FullName = request.FullName,
                PhoneNumber = request.PhoneNumber,
                Balance = request.Balance,
                Status = "Faol"
            };

            await _context.AddAsync(student);
            await _context.SaveChangesAsync();

            return student.Id;
        }
    }
}
