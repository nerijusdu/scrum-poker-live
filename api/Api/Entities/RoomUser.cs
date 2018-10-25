namespace Api.Entities
{
    public class RoomUser
    {
        public int RoomId { get; set; }
        public Room Room { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string Estimate { get; set; }
    }
}
