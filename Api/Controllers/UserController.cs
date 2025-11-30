using Api.BusinessLogic.Dto.UserDto;
using Api.BusinessLogic.Services.Abstraction;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ILogger<UserController> _logger;
    private readonly IMapper _mapper;

    public UserController(IUserService userService, ILogger<UserController> logger, IMapper mapper)
    {
        _userService = userService;
        _logger = logger;
        _mapper = mapper;
    }
    
    [HttpGet]
    [Authorize(Roles = "Administrator,Owner")]
    public async Task<ActionResult<IEnumerable<UserGetDto>>> GetAllAsync()
    {
        return Ok(await _userService.GetAllAsync());
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Administrator,Owner")]
    public async Task<ActionResult<string>> UpdateAsync(int id, [FromBody] UserCreateDto dto)
    {
        return Ok(await _userService.UpdateAsync(id, dto));
    }

    [HttpPost]
    [Authorize(Roles = "Administrator,Owner")]
    public async Task<ActionResult<int>> CreateAsync([FromBody] UserCreateDto dto)
    {
        return Ok(await _userService.CreateAsync(dto));
    }
    
    [HttpPost("validate")]
    public async Task<ActionResult<UserValidateResponseDto>> Validate([FromBody] LoginDto dto)
    {
        var user = await _userService.ValidateUserAsync(dto.UserCode, dto.Mail);
    
        if (user == null)
            return Unauthorized();
    
        return Ok(_mapper.Map<UserValidateResponseDto>(user));
    }
    
}