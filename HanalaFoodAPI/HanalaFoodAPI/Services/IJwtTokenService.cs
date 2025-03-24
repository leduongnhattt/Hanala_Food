using HanalaFoodAPI.Models;

namespace HanalaFoodAPI.Services
{
    public interface IJwtTokenService
    {
        public string GenerateToken(Account account);
        public string GenerateRefreshToken();
    }
}
