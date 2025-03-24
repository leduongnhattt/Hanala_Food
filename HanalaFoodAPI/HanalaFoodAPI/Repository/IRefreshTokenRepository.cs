using HanalaFoodAPI.Models;

namespace HanalaFoodAPI.Repository
{
    public interface IRefreshTokenRepository
    {
        Task SaveRefreshToken(RefreshToken refreshToken);
        Task<RefreshToken?> GetRefreshToken(string token);
        Task UpdateRefreshToken(RefreshToken refreshToken);
    }
}
