using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Api.Entities;

namespace Api.Dtos
{
    public class RoomDto
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public UserDto Master { get; set; }
        public IList<UserDto> Users { get; set; }
        public string Password { get; set; }
        public bool IsLocked { get; set; }

        public RoomDto() { }

        public RoomDto(Room room, bool includeUsers = false, bool includePass = false)
        {
            Id = room.Id;
            Name = room.Name;
            Master = new UserDto(room.Master);
            IsLocked = !string.IsNullOrEmpty(room.Password);

            if (includePass)
            {
                Password = room.Password;
            }

            if (includeUsers)
            {
                Users = room.Users.Select(x => new UserDto(x.User)).ToList();
            }
        }
    }
}
