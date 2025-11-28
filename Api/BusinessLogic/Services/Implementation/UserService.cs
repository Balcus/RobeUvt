using Api.BusinessLogic.Dto.UserDto;
using Api.BusinessLogic.Services.Abstraction;
using Api.Controllers;
using Api.DataAccess.Abstractions;
using Api.DataAccess.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.BusinessLogic.Services.Implementation;

public class UserService : IUserService
{
    private readonly IRepository<User, string> _repository;
    private readonly IMapper _mapper;
    private readonly ILogger<UserController> _logger;
    private readonly IMailService _mailService;
    
    public UserService(
        IRepository<User, string> repository,
        IMapper mapper,
        ILogger<UserController> logger,
        IMailService mailService)
    {
        _repository = repository;
        _mapper = mapper;
        _logger = logger;
        _mailService = mailService;
    }
    
    public async Task<IEnumerable<UserGetDto>> GetAllAsync()
    {
        return _mapper.Map<IEnumerable<UserGetDto>>(await _repository.GetAllAsync());
    }

    public Task<UserGetDto> GetByIdAsync(string id)
    {
        throw new NotImplementedException();
    }

    public async Task<string> CreateAsync(UserCreateDto dto)
    {
        var id = await _repository.CreateAsync(_mapper.Map<User>(dto));
        await _mailService.SendMailAsync(dto.Mail, "User Created", "User has successfully been created");
        return id;
    }

    public Task<string> UpdateAsync(string id, UserCreateDto dto)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(string id)
    {
        throw new NotImplementedException();
    }

    public async Task<UserValidateResponseDto?> ValidateUserAsync(string email)
    {
        // Get user by email
        var users = await _repository.GetByConditionAsync(u => u.Mail == email);
        var user = users.FirstOrDefault();
        
        if (user == null)
            return null;

        return new UserValidateResponseDto
        {
            Id = user.Id,
            Mail = user.Mail,
            Name = user.Name,
            Role = user.Role.ToString()
        };
    }
}