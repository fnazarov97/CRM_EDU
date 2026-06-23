using MediatR;

namespace EduCRM.Application.Students.Queries
{
    public record GetStudentsQuery() : IRequest<List<StudentDto>>;

    public record StudentDto(Guid Id, string FullName, string PhoneNumber, decimal Balance, string Status, DateTime CreatedAt);
}
