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
    }
}
