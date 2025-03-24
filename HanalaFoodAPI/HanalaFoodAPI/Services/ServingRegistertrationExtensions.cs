using HanalaFoodAPI.Models;
using HanalaFoodAPI.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HanalaFoodAPI.Services
{
    public static class ServingRegistertrationExtensions
    {
        public static IServiceCollection AddServingRegistration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHttpContextAccessor();
            services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<UserService>();
            services.AddScoped<IJwtTokenService, JwtTokenService>();
            services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
            services.AddScoped<IPasswordHasher<Account>, PasswordHasher<Account>>();
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("ConnectDefault"));
            });
            return services;
        }
    }
}
