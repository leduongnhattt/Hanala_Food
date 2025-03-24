using Azure;
using HanalaFoodAPI.DTOs;
using HanalaFoodAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HanalaFoodAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;

        public AuthController(UserService userService)
        {
            _userService = userService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterAccountDTO registerAccountDTO)
        {
            if (registerAccountDTO == null)
            {
                return BadRequest(new { Status = "Error", Message = "Invalid user data." });
            }
            var response = await _userService.RegisterAccountAsync(registerAccountDTO);
            if (!response.Success)
            {
                return Conflict(new { Status = "Conflict", Message = response.Message });
            }

            return Ok(new { Status = "Success", Message = response.Message });
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginAccountDTO loginAccountDTO)
        {
            if (loginAccountDTO == null)
            {
                return BadRequest(new { Message = "Invalid user data." });
            }
            var response = await _userService.LoginAccountAsync(loginAccountDTO);

            if (!response.Success)
            {
                return BadRequest(new { Status = "Failed", Message = response.Message });
            }

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true, 
                Secure = true,   
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)  
            };
            Response.Cookies.Append("refreshToken", response.Data.RefreshToken, cookieOptions);

            return Ok(new
            {
                Token = response.Data.AccessToken, 
                Status = "Success"
            });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshTokenAsync()
        {
 
            if (!Request.Cookies.TryGetValue("refreshToken", out string refreshToken))
            {
                return Unauthorized(new { Status = "Failed", Message = "Refresh token not found." });
            }

            var response = await _userService.RereshTokenAsync(refreshToken);

            if (!response.Success)
            {
                return Unauthorized(new { Status = "Failed", Message = response.Message });
            }

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", response.Data.RefreshToken, cookieOptions);

            return Ok(new
            {
                AccessToken = response.Data.AccessToken,
                Status = "Success"
            });
        }
    }
}
