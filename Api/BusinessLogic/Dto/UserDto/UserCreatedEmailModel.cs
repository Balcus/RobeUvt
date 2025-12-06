namespace Api.BusinessLogic.Dto.UserDto;

public record UserCreatedEmailModel
{
    public string UserCode { get; init; } = null!;
    public string FirstName { get; init; } = null!;
    public string LastName { get; init; } = null!;
    public string QrCodeBase64 { get; init; } = null!;
}