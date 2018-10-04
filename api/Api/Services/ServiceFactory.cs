using Api.Services.Contracts;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Services
{
    public class ServiceFactory
    {
        public static void RegisterServices(IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IRoomService, RoomService>();
        }
    }
}
