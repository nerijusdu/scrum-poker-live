using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs
{
    public class RoomHub : Hub<IRoomBroadcaster>
    {
        public override Task OnConnectedAsync()
        {
            return Clients.Client(Context.ConnectionId).SetConnectionId(Context.ConnectionId);
        }

        public Task Subscribe(int roomId)
        {
            return Groups.AddToGroupAsync(Context.ConnectionId, roomId.ToString());
        }

        public Task Unsubscribe(int roomId)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId.ToString());
        }
    }

    public interface IRoomBroadcaster : IBroadcaster
    {

    }
}
