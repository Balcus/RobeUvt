using Api.DataAccess.Enums;

namespace Api.BusinessLogic.Dto.UserDto;

public record UserCreateDto : Dto
{
    public string Mail { get; init; } = null!;
    public string? Phone { get; init; }
    public string FirstName { get; init; } = null!;
    public string LastName { get; init; } = null!;
    public Gender? Gender { get; init; }
    public GownSize? GownSize { get; init; }
    public CapSize? CapSize { get; init; }
    public string? Address { get; init; }
    public string? Country { get; init; }
    public string? City { get; init; }
    public StudyCycle? StudyCycle { get; init; }
    public int FacultyId { get; init; }
    public string? StudyProgram { get; init; }
    public Promotion? Promotion { get; init; }
    public bool DoubleSpecialization { get; init; } = false;
    public bool DoubleCycle { get; init; } = false;
    public bool DoubleFaculty { get; init; } = false;
    public bool DoubleStudyProgram { get; init; } = false;
    public bool SpecialNeeds { get; init; } = false;
    public bool MobilityAccess { get; init; } = false;
    public bool ExtraAssistance { get; init; } = false;
    public string? OtherNeeds { get; init; }
}