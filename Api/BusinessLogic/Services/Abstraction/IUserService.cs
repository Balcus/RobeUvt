using Api.BusinessLogic.Dto.UserDto;

namespace Api.BusinessLogic.Services.Abstraction;

public interface IUserService : ICrudService<UserCreateDto, UserGetDto, int>
{
    Task<UserValidateResponseDto?> ValidateUserAsync(string userCode, string email);
}