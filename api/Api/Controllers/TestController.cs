using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api.Controllers
{
    [Route("Test")]
    [AllowAnonymous]
    public class TestController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View("Index");
        }
    }
}
