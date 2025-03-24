using HanalaFoodAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace HanalaFoodAPI.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateUserAsync(Account account)
        {
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
        }

        public async Task<Account?> GetUserById(string accountID)
        {
            if (accountID == null)
            {
                throw new ArgumentNullException(nameof(accountID));
            }
            return await _context.Accounts.FirstOrDefaultAsync(a => a.AccountID == accountID);
        }

        public async Task<Account?> GetUserByUserName(string UserName)
        {
            if (string.IsNullOrWhiteSpace(UserName))
            {
                throw new ArgumentNullException(nameof(UserName), "Username cannot be null or empty!");
            }
            return await _context.Accounts.FirstOrDefaultAsync(x => x.UserName == UserName);
        }

        public async Task UpdateUserAsync(Account updatedUser)
        {
            await _context.SaveChangesAsync();
        }
    }
}
