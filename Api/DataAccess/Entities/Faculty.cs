using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Api.DataAccess.Abstractions;

namespace Api.DataAccess.Entities;

public class Faculty : IEntityBase<int>
{
    [Key] [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [Required] [MaxLength(200)]
    public required string Name { get; set; }
}