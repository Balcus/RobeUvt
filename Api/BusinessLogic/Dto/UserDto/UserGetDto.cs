using Api.DataAccess.Enums;

namespace Api.BusinessLogic.Dto.UserDto;

public record UserGetDto : Dto
{
    public int Id { get; init; }
    public string UserCode { get; init; } = null!;
    public string Mail { get; init; } = null!;
    public string? Phone { get; init; }
    public string FirstName { get; init; } = null!;
    public string LastName { get; init; } = null!;
    public Gender? Gender { get; init; }
    public Role Role { get; init; }
    public GownSize? GownSize { get; init; }
    public CapSize? CapSize { get; init; }
    public string? Address { get; init; }
    public string? Country { get; init; }
    public string? City { get; init; }
    public StudyCycle? StudyCycle { get; init; }
    public int FacultyId { get; init; }
    public string? StudyProgram { get; init; }
    public Promotion? Promotion { get; init; }
    public bool DoubleSpecialization { get; init; }
    public bool DoubleCycle { get; init; }
    public bool DoubleFaculty { get; init; }
    public bool DoubleStudyProgram { get; init; }
    public bool SpecialNeeds { get; init; }
    public bool MobilityAccess { get; init; }
    public bool ExtraAssistance { get; init; }
    public string? OtherNeeds { get; init; }
    public DateTime CreatedAt { get; init; }
}