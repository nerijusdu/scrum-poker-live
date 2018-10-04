using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class ExtendedControllerBase : ControllerBase
    {
        public int UserId => int.Parse(User?.Identity?.Name);
    }
}
