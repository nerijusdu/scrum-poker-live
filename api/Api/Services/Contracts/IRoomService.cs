using System.Collections.Generic;
using Api.Dtos;

namespace Api.Services.Contracts
{
    public interface IRoomService
    {
        List<RoomDto> GetRooms();
        RoomDto CreateRoom(RoomDto room);
        RoomDto GetById(int id);
        void DeleteRoom(int id);
        void ConnectToRoom(int userId, int roomId, string password = null);
        void DisconnectFromRoom(int userId, int roomId = 0);
    }
}
