using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EduCRM.Application.Sessions.Commands;
using EduCRM.Application.Sessions.Queries;

namespace EduCRM.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class SessionsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SessionsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<SessionDto>>> GetSessions()
        {
            var result = await _mediator.Send(new GetSessionsQuery());
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateSession([FromBody] CreateSessionCommand command)
        {
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetSessions), new { id = result }, result);
        }
    }
}
