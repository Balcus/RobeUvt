namespace Gateway.Dto;

public record AuthUserDto
{
    public string Id { get; init; } = null!;
    public string Mail { get; init; } = null!;
    public string Name { get; init; } = null!;
    public string Role { get; init; } = null!;
}