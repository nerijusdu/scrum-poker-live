using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class ExtendedControllerBase : ControllerBase
    {
        protected int UserId => int.Parse(User?.Identity?.Name);

        protected IActionResult EmptyOk() => Ok(new EmptyResult());
    }
}
