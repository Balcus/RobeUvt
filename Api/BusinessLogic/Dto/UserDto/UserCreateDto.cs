using System.ComponentModel.DataAnnotations;

namespace Api.BusinessLogic.Dto.UserDto;

public record UserCreateDto : Dto
{
    [EmailAddress]
    [MaxLength(100)]
    [Required]
    public string Mail { get; init; } = null!;

    [Required] [MaxLength(100)] public string Name { get; init; } = null!;
}