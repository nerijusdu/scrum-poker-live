using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Services.Contracts;
using Microsoft.AspNetCore.Authorization;

namespace Api.Hubs
{
    [Authorize]
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

        public override Task OnDisconnectedAsync(Exception exception)
        {
            roomService.DisconnectFromRoom(UserId);
            return base.OnDisconnectedAsync(exception);
        }
        // TODO: maybe store ConnectionId in database
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

            UpdateUsers(roomId);

            var estimates = roomService.GetEstimates(roomId, true);
            Clients.Group(roomId.ToString()).UpdateEstimates(estimates);

            return Task.CompletedTask;
        }

        public Task Unsubscribe(int roomId)
        {
            roomService.DisconnectFromRoom(UserId, roomId);
            UpdateUsers(roomId);
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId.ToString());
        }

        public Task AddEstimate(int roomId, string estimate)
        {
            if (!roomService.ContainsUser(roomId, UserId))
            {
                return Task.CompletedTask;
            }

            var estimates = roomService.ChangeEstimate(roomId, UserId, estimate);
            Clients.Group(roomId.ToString()).UpdateEstimates(estimates);
            return Task.CompletedTask;
        }

        public Task ShowEstimates(int roomId)
        {
            var room = roomService.GetById(roomId);
            if (room.Master.Id != UserId)
            {
                return Task.CompletedTask;
            }

            var estimates = roomService.GetEstimates(roomId);
            Clients.Group(roomId.ToString()).UpdateEstimates(estimates);
            return Task.CompletedTask;
        }

        public Task ClearEstimates(int roomId)
        {
            var room = roomService.GetById(roomId);
            if (room.Master.Id != UserId)
            {
                return Task.CompletedTask;
            }

            var estimates = roomService.ClearEstimates(roomId);
            Clients.Group(roomId.ToString()).UpdateEstimates(estimates);
            return Task.CompletedTask;
        }
        
        private void UpdateUsers(int roomId)
        {
            var room = roomService.GetById(roomId);
            if (room.Id == 0)
            {
                Clients.Group(roomId.ToString()).Disconnect();
                return;
            }
            Clients.Group(roomId.ToString()).UpdateUserList(room.Users);
        }
    }

    public interface IRoomBroadcaster : IBroadcaster
    {
        Task OnConnected(bool success, string message = null);
        Task Disconnect();
        Task UpdateUserList(IList<UserDto> users);
        Task UpdateEstimates(IList<EstimateDto> estimates);
    }
}
