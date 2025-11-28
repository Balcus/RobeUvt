using System.Security.Claims;
using Gateway.Dto;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace Gateway.Controllers;

[Route("auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IHttpClientFactory httpClientFactory, ILogger<AuthController> logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var client = _httpClientFactory.CreateClient("api");
        var response = await client.PostAsJsonAsync("/api/user/validate", dto);

        if (!response.IsSuccessStatusCode)
            return Unauthorized();

        var user = await response.Content.ReadFromJsonAsync<AuthUserDto>();

        var claims = new List<Claim>
        {
            new(ClaimTypes.Sid, user!.Id),
            new(ClaimTypes.Email, user.Mail),
            new(ClaimTypes.Name, user.Name),
            new(ClaimTypes.Role, user.Role)
        };

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);

        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            principal,
            new AuthenticationProperties
            {
                IsPersistent = true,
                ExpiresUtc = DateTime.UtcNow.AddHours(24)
            });

        return Ok(new { message = "Logged in" });
    }

    [HttpGet("me")]
    public IActionResult Me()
    {
        if (User.Identity != null && !User.Identity.IsAuthenticated)
        {
            return Unauthorized();
        }
        
        var id = User.FindFirst(ClaimTypes.Sid)?.Value;
        var mail = User.FindFirst(ClaimTypes.Email)?.Value;
        var name = User.FindFirst(ClaimTypes.Name)?.Value;
        var role = User.FindFirst(ClaimTypes.Role)?.Value;

        return Ok(new
        {
            Id = id,
            Mail = mail,
            Name = name,
            Role = role
        });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync();
        return Ok();
    }
}