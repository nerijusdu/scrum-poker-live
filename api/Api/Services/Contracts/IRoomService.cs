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
        bool ContainsUser(int roomId, int userId);
        List<EstimateDto> GetEstimates(int roomId, bool hidden = false);
        List<EstimateDto> ChangeEstimate(int roomId, int userId, string estimate);
        List<EstimateDto> ClearEstimates(int roomId);
    }
}
