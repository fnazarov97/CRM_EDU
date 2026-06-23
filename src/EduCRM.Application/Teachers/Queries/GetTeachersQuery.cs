using MediatR;

namespace EduCRM.Application.Teachers.Queries
{
    public record GetTeachersQuery() : IRequest<List<TeacherDto>>;

    public record TeacherDto(Guid Id, string FullName, string PhoneNumber, string Specialization, decimal HourlyRate, string Status);
}
