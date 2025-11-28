namespace Api.BusinessLogic.Dto.UserDto;

public record UserValidateResponseDto
{
    public string Id { get; init; } = null!;
    public string Mail { get; init; } = null!;
    public string Name { get; init; } = null!;
    public string Role { get; init; } = null!;
}