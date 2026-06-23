using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EduCRM.Application.Leads.Commands;
using EduCRM.Application.Leads.Queries;

namespace EduCRM.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class LeadsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public LeadsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<LeadDto>>> GetLeads()
        {
            var result = await _mediator.Send(new GetLeadsQuery());
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> CreateLead([FromBody] CreateLeadCommand command)
        {
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetLeads), new { id = result }, result);
        }
    }
}
