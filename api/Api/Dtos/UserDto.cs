using Api.Entities;

namespace Api.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public UserDto(User user)
        {
            if (user == null)
            {
                return;
            }
            Id = user.Id;
            Name = user.Name;
            Email = user.Email;
        }

        public UserDto() { }
    }
}
