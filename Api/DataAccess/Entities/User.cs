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

    [Required] [MaxLength(100)] public required string UserCode { get; set; }

    [Required] [EmailAddress] [MaxLength(100)]
    public required string Mail { get; set; }
    
    [Phone] [MaxLength(10)] public string? Phone { get; set; }

    [Required] [MaxLength(100)] 
    public required string FirstName { get; set; }
    
    [Required] [MaxLength(100)]
    public required string LastName { get; set; }
    
    public Gender? Gender { get; set; }

    [Required]
    public Role Role { get; set; } = Role.Student;

    public GownSize? GownSize { get; set; }
    
    public CapSize? CapSize { get; set; }
    
    [Required]  [MaxLength(100)]
    public required string PasswordHash { get; set; }
    
    [MaxLength(200)]
    public string? Address { get; set; }
    
    [MaxLength(100)]
    public string? Country { get; set; }
    
    [MaxLength(100)]
    public string? City { get; set; }
    
    public StudyCycle? StudyCycle { get; set; }

    [Required]
    [ForeignKey(nameof(Faculty))]
    public int FacultyId { get; set; } = 1;

    [MaxLength(100)]
    public string? StudyProgram { get; set; }

    public Promotion? Promotion { get; set; } = Enums.Promotion.Actual;

    public bool DoubleSpecialization { get; set; } = false;

    public bool DoubleCycle { get; set; } = false;
    
    public bool DoubleFaculty { get; set; } = false;
    
    public bool DoubleStudyProgram { get; set; } = false;
    
    public bool SpecialNeeds { get; set; } = false;
    
    public bool MobilityAccess { get; set; } = false;
    
    public bool ExtraAssistance {get; set;} = false;
    
    public string? OtherNeeds { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public required Faculty Faculty { get; set; }
}