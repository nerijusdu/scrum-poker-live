using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs
{
    public class HubBase<T> : Hub<T> where T : class
    {
        protected int UserId => int.Parse(Context.GetHttpContext().User?.Identity?.Name);
    }
}
