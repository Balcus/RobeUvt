namespace Api.BusinessLogic.Dto.UserDto;

public record UserCreatedEmailModel
{
    public required string UserCode { get; init; }
    public required string Name { get; init; }
}