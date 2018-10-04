using Api.Dtos;
using Api.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("rooms")]
    [EnableCors("AllowAllOrigins")]
    public class RoomsControler : ExtendedControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomsControler(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetRooms()
        {
            var rooms = _roomService.GetRooms();
            return Ok(rooms);
        }

        [HttpPost]
        public IActionResult CreateRoom([FromBody] RoomDto room)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            room.Master = new UserDto
            {
                Id = UserId
            };

            var createdRoom = _roomService.CreateRoom(room);
            return Ok(createdRoom);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetRoomById(int id)
        {
            var room = _roomService.GetById(id);
            return Ok(room);
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteRoom(int id)
        {
            var room = _roomService.GetById(id);
            if (room.Master.Id != UserId)
            {
                return Forbid();
            }

            _roomService.DeleteRoom(id);
            return Ok();
        }
    }
}
