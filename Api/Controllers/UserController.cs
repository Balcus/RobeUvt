using Api.BusinessLogic.Dto.UserDto;
using Api.BusinessLogic.Services.Abstraction;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ILogger<UserController> _logger;

    public UserController(IUserService userService, ILogger<UserController> logger)
    {
        _userService = userService;
        _logger = logger;
    }
    
    [HttpGet]
    [Authorize(Roles = "Student")]
    public async Task<ActionResult<IEnumerable<UserGetDto>>> GetAllAsync()
    {
        return Ok(await _userService.GetAllAsync());
    }

    [HttpPost]
    [Authorize(Roles = "Student")]
    public async Task<ActionResult<int>> CreateAsync([FromBody] UserCreateDto userCreateDto)
    {
        return Ok(await _userService.CreateAsync(userCreateDto));
    }
    
    [HttpPost("validate")]
    public async Task<ActionResult<UserValidateResponseDto>> Validate([FromBody] LoginDto dto)
    {
        var user = await _userService.ValidateUserAsync(dto.Mail);
    
        if (user == null)
            return Unauthorized();
    
        return Ok(new UserValidateResponseDto 
        { 
            Id = user.Id,
            Mail = user.Mail, 
            Name = user.Name, 
            Role = user.Role 
        });
    }
    
}