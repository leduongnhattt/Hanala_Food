using HanalaFoodAPI.Models;

namespace HanalaFoodAPI.Repository
{
    public interface IUserRepository
    {
        Task<Account?> GetUserByUserName(string UserName);
        Task CreateUserAsync(Account account);
        Task UpdateUserAsync(Account updatedUser);
        Task<Account?> GetUserById(String accountID);
    }
}
