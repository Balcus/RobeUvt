namespace Api.BusinessLogic.Dto.UserDto;

public record UserUpdateDto
{
    public string? Name { get; init; }
    public string? Mail { get; init; }
}