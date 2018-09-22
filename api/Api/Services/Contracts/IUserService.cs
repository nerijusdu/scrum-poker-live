using Api.Entities;

namespace Api.Services.Contracts
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        User GetById(int id);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
    }
}
