using Api.BusinessLogic.Dto.UserDto;
using Api.BusinessLogic.Services.Abstraction;
using Api.Controllers;
using Api.DataAccess.Abstractions;
using Api.DataAccess.Entities;
using AutoMapper;

namespace Api.BusinessLogic.Services.Implementation;

public class UserService : IUserService
{
    private readonly IRepository<User, int> _repository;
    private readonly IMapper _mapper;
    private readonly ILogger<UserController> _logger;
    private readonly IMailService _mailService;
    
    public UserService(
        IRepository<User, int> repository,
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

    public async Task<int> CreateAsync(UserCreateDto dto)
    {
        var user = _mapper.Map<User>(dto);
        var id = await _repository.CreateAsync(user);
        await _mailService.SendMailAsync(
            dto.Mail, 
            "RobeUVT account created successfully", 
            "UserCreated.cshtml", 
            _mapper.Map<UserCreatedEmailModel>(user)
        );
        return id;
    }
    
    public async Task<UserValidateResponseDto?> ValidateUserAsync(string userCode, string email)
    {
        var users = await _repository.GetByConditionAsync(u => (u.Mail == email && u.UserCode == userCode));
        var user = users.FirstOrDefault();
        return user == null ? null : _mapper.Map<UserValidateResponseDto>(user);
    }
    
    public async Task<UserGetDto> GetByIdAsync(int id)
    {
        return _mapper.Map<UserGetDto>(await _repository.GetByIdAsync(id));
    }
    
    public async Task<int> UpdateAsync(int id, UserCreateDto dto)
    {
        var user = await _repository.GetByIdAsync(id);
        if (user == null)
        {
            throw new Exception("User does not exist");
        }
        _mapper.Map(dto, user);
        return await _repository.UpdateAsync(user);
    }

    public Task DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }

}