namespace Api.BusinessLogic.Dto.UserDto;

public record LoginDto
{
    public string Mail { get; init; } = null!;
}