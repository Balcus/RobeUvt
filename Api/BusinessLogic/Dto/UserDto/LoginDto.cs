namespace Api.BusinessLogic.Dto.UserDto;

public record LoginDto
{
    public string UserCode { get; init; } = null!;
    public string Mail { get; init; } = null!;
}