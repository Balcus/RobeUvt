using Api.BusinessLogic.Dto.UserDto;
using Api.DataAccess.Entities;
using AutoMapper;

namespace Api.BusinessLogic.Mapping.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<UserCreateDto, User>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => GenerateId(src.Mail)));
        
        CreateMap<User, UserGetDto>();
    }

    private static string GenerateId(string mail)
    {
        return $"{mail}_{Guid.NewGuid()}";
    }
}