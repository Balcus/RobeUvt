using Api.DataAccess.Enums;

namespace Api.BusinessLogic.Dto.UserDto;

public record UserGetDto : Dto
{
    public string Mail { get; init; } = null!;
    public Role Role { get; init; }
}