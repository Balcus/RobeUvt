using Api.BusinessLogic.Dto.UserDto;

namespace Api.BusinessLogic.Services.Abstraction;

public interface IUserService : ICrudService<UserCreateDto, UserGetDto, string>
{
    Task<UserValidateResponseDto?> ValidateUserAsync(string email);
}