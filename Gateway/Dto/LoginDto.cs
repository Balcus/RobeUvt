using System.ComponentModel.DataAnnotations;

namespace Gateway.Dto;

public class LoginDto
{
    [Required]
    [EmailAddress]
    public string Mail { get; set; } = null!;
}