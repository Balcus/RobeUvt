using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Api.DataAccess.Abstractions;
using Api.DataAccess.Enums;
using Microsoft.EntityFrameworkCore;

namespace Api.DataAccess.Entities;

[Index(nameof(Mail), IsUnique = true)]
[Index(nameof(UserCode), IsUnique = true)]
public class User : IEntityBase<int>
{
    [Key] [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required] [MaxLength(100)] public string UserCode { get; set; } = null!;

    [Required] [EmailAddress] [MaxLength(100)]
    public string Mail { get; set; } = null!;

    [Required] [MaxLength(100)] 
    public string Name { get; set; } = null!;

    public Role Role { get; set; } = Role.Student;
}