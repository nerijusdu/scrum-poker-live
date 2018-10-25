using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace Api.Hubs
{
    [Authorize]
    [EnableCors("AllowAllOrigins")]
    public class RoomHub : HubBase<IRoomBroadcaster>
    {
        private readonly IRoomService roomService;

        public RoomHub(IRoomService roomService)
        {
            this.roomService = roomService;
        }

        public override Task OnConnectedAsync()
        {
            return Clients.Client(Context.ConnectionId).SetConnectionId(Context.ConnectionId);
        }

        public Task Subscribe(int roomId, string password = null)
        {
            try
            {
                roomService.ConnectToRoom(UserId, roomId, password);
                Clients.Caller.OnConnected(true);
                Groups.AddToGroupAsync(Context.ConnectionId, roomId.ToString());
            }
            catch (Exception e)
            {
                Clients.Caller.OnConnected(false, e.Message);
                return Task.CompletedTask;
            }

            var room = roomService.GetById(roomId);
            Clients.Group(roomId.ToString()).UpdateUserList(room.Users);
            return Task.CompletedTask;
        }

        public Task Unsubscribe(int roomId)
        {
            roomService.DisconnectFromRoom(UserId, roomId);
            var room = roomService.GetById(roomId);
            Clients.Group(roomId.ToString()).UpdateUserList(room.Users);
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId.ToString());
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            roomService.DisconnectFromRoom(UserId);
            return base.OnDisconnectedAsync(exception);
        }
    }

    public interface IRoomBroadcaster : IBroadcaster
    {
        Task OnConnected(bool success, string message = null);
        Task UpdateUserList(IList<UserDto> users);
    }
}
