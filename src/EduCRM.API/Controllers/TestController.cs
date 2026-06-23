using Microsoft.AspNetCore.Mvc;

namespace EduCRM.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok(new { message = "EduCRM API is running successfully!", timestamp = System.DateTime.UtcNow });
        }
    }
}
