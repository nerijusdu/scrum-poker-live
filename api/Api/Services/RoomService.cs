using System.Collections.Generic;
using System.Linq;
using Api.Dtos;
using Api.Entities;
using Api.Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class RoomService : IRoomService
    {
        private readonly AppDbContext _context;
        private readonly IUserService _userService;

        public RoomService(AppDbContext appDbContext, IUserService userService)
        {
            _context = appDbContext;
            _userService = userService;
        }

        public List<RoomDto> GetRooms()
        {
            return _context.Rooms
                .Include(x => x.Master)
                .Select(x => new RoomDto(x, false, false))
                .ToList();
        }

        public RoomDto CreateRoom(RoomDto room)
        {
            var user = _userService.GetById(room.Master.Id);
            var newRoom = new Room
            {
                Master = user,
                Name = room.Name,
                Password = room.Password
            };

            var createdRoom = _context.Rooms.Add(newRoom);
            _context.SaveChanges();
            _context.Add(new RoomUser
            {
                RoomId = createdRoom.Entity.Id,
                UserId = room.Master.Id
            });
            _context.SaveChanges();

            return new RoomDto(createdRoom.Entity);
        }

        public RoomDto GetById(int id)
        {
            var room = _context.Rooms
                .Include(x => x.Master)
                .Include(x => x.Users)
                    .ThenInclude(x => x.User)
                .FirstOrDefault(x => x.Id == id);
            return new RoomDto(room, true);
        }

        public void DeleteRoom(int id)
        {
            var room = _context.Rooms.Find(id);
            _context.Remove(room);
            _context.SaveChanges();
        }
    }
}
