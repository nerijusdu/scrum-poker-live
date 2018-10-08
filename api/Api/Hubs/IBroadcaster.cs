using System.Threading.Tasks;

namespace Api.Hubs
{
    public interface IBroadcaster
    {
        Task SetConnectionId(string connectionId);
    }
}
