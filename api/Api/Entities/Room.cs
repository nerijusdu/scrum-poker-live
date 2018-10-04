using System.Collections.Generic;

namespace Api.Entities
{
    public class Room : Entity
    {
        public string Name { get; set; }
        public User Master { get; set; }
        public List<RoomUser> Users { get; set; }
        public string Password { get; set; }
    }
}
