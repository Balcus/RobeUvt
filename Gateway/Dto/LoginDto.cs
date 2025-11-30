using System.ComponentModel.DataAnnotations;

namespace Gateway.Dto;

public class LoginDto
{
    [Required] public string UserCode { get; set; } = null!;

    [Required] [EmailAddress] public string Mail { get; set; } = null!;
}