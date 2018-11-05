using System.Collections.Generic;

namespace Api.Entities
{
    public class User : Entity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public List<RoomUser> Rooms { get; set; }
    }
}
