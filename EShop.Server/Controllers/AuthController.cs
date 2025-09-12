using EShop.Application.Services;
using EShop.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EShop.Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserService _userService;

        public AuthController(IConfiguration configuration, UserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _userService.GetUserByIdAsync(request.Username);
            if (user != null && _userService.VerifyPassword(user, request.Password))
            {
                var token = GenerateJwtToken(request.Username);

                var response = new
                {
                    Token = token,
                    UserId = user.Id
                };

                return Ok(response);
            }
            return Unauthorized("Invalid username or password.");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            // Check if the username already exists
            var existingUser = await _userService.GetUserByIdAsync(request.Username);
            if (existingUser != null)
                return BadRequest("Username already exists.");

            // Create new user
            var user = new User
            {
                Email = request.Username
                // DBId will be generated automatically by EF
            };

            // Hash the password
            user.PasswordHash = _userService.HashPassword(user, request.Password);

            // Add user to the repository
            await _userService.AddUserAsync(user);

            // Optionally generate JWT immediately after registration
            var token = GenerateJwtToken(user.Email);

            return Ok(new
            {
                Token = token,
                UserId = user.Id,
            });
        }

        // DTO for registration
        public class RegisterRequest
        {
            public string Username { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }


        private string GenerateJwtToken(string username)
        {
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
            var credentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Name, username)
            };
            var token = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials);
            return new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler().WriteToken(token);
        }

        public class LoginRequest
        {
            public string Username { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }
    }
}
