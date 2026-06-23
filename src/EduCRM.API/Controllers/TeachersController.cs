using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EduCRM.Application.Teachers.Commands;
using EduCRM.Application.Teachers.Queries;

namespace EduCRM.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class TeachersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TeachersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<TeacherDto>>> GetTeachers()
        {
            var result = await _mediator.Send(new GetTeachersQuery());
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateTeacher([FromBody] CreateTeacherCommand command)
        {
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetTeachers), new { id = result }, result);
        }
    }
}
