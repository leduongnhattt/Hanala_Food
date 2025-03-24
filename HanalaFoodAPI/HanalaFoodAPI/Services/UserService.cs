using HanalaFoodAPI.DTOs;
using HanalaFoodAPI.Models;
using HanalaFoodAPI.Repository;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;

namespace HanalaFoodAPI.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IPasswordHasher<Account> _passwordHasher;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public UserService(IUserRepository userRepository, IJwtTokenService jwtTokenService, IPasswordHasher<Account> passwordHasher, IHttpContextAccessor httpContextAccessor, IRefreshTokenRepository refreshTokenRepository)
        {
            _userRepository = userRepository;
            _jwtTokenService = jwtTokenService;
            _passwordHasher = passwordHasher;
            _httpContextAccessor = httpContextAccessor;
            _refreshTokenRepository = refreshTokenRepository;
        }

        public async Task<ServiceResponse<string>> RegisterAccountAsync(RegisterAccountDTO registerAccountDTO)
        {
            var response = new ServiceResponse<string>();
            var existingUser = await _userRepository.GetUserByUserName(registerAccountDTO.UserName);
            if (existingUser != null)
            {
                response.Success = false;
                response.Message = "User already exists.";
                return response;
            }
            var account = new Account
            {
                UserName = registerAccountDTO.UserName,
                Email = registerAccountDTO.Email,
                AvatarUrl = "",
                Role = RoleType.Customer, 
                Status = "Active", 
                CreateAt = DateTime.UtcNow
            };
            account.PasswordHash = _passwordHasher.HashPassword(account, registerAccountDTO.Password);
            await _userRepository.CreateUserAsync(account);
            response.Success = true;
            response.Message = "Registration successful.";
            return response;
        }

        public async Task<ServiceResponse<TokenResponseDTO>> LoginAccountAsync(LoginAccountDTO loginAccountDTO)
        {
            var response = new ServiceResponse<TokenResponseDTO>();
            var account = await _userRepository.GetUserByUserName(loginAccountDTO.UserName);

            if (account == null)
            {
                response.Success = false;
                response.Message = "User not found.";
                return response;
            }
            var passwordVerification = _passwordHasher.VerifyHashedPassword(account, account.PasswordHash, loginAccountDTO.Password);
            if (passwordVerification != PasswordVerificationResult.Success)
            {
                response.Success = false;
                response.Message = "Incorrect password.";
                return response;
            }
            var token = _jwtTokenService.GenerateToken(account);
            var refreshToken = _jwtTokenService.GenerateRefreshToken();
            var refreshTokenEntity = new RefreshToken
            {
                Token = refreshToken,
                AccountID = account.AccountID,
                ExpireTime = DateTime.UtcNow.AddDays(1),
                CreateAt = DateTime.UtcNow,
                IsRevoked = false,
            };
            await _refreshTokenRepository.SaveRefreshToken(refreshTokenEntity);
            response.Success = true;
            response.Message = "Login successful.";
            response.Data = new TokenResponseDTO
            {
                AccessToken = token,
                RefreshToken = refreshToken
            };
            return response;
        }
        public async Task<ServiceResponse<TokenResponseDTO>> RereshTokenAsync(string refreshToken)
        {
            var response = new ServiceResponse<TokenResponseDTO>();

            var storedToken = await _refreshTokenRepository.GetRefreshToken(refreshToken);
            if (storedToken == null || storedToken.ExpireTime < DateTime.UtcNow || storedToken.IsRevoked)
            {
                response.Success = false;
                response.Message = "Invalid refresh token.";
                return response;
            }

            var account = await _userRepository.GetUserById(storedToken.AccountID);
            if (account == null)
            {
                response.Success = false;
                response.Message = "Account not found.";
                return response;
            }

            var newAccessToken = _jwtTokenService.GenerateToken(account);
            var newRefreshToken = _jwtTokenService.GenerateRefreshToken();
            storedToken.Token = newRefreshToken;
            storedToken.ExpireTime = DateTime.UtcNow.AddDays(1);
            storedToken.CreateAt = DateTime.UtcNow;
            await _refreshTokenRepository.UpdateRefreshToken(storedToken);
            response.Success = true;
            response.Data = new TokenResponseDTO
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };

            return response;
        }
    }
}
