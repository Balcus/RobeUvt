namespace Gateway.Dto;

public record AuthUserDto
{
    public int Id;
    public string UserCode { get; init; } = null!;
    public string Mail { get; init; } = null!;
    public string Name { get; init; } = null!;
    public string Role { get; init; } = null!;
}