using System.Text;
using Api.BusinessLogic.Dto.UserDto;
using Api.DataAccess.Entities;
using AutoMapper;

namespace Api.BusinessLogic.Mapping.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<UserCreateDto, User>()
            .ForMember(dest => dest.UserCode, opt => opt.MapFrom(src => GenerateCode(src.Mail)));
        
        CreateMap<User, UserGetDto>();
        CreateMap<User, UserValidateResponseDto>();
        CreateMap<User, UserCreatedEmailModel>();
    }

    private static string GenerateCode(string mail) => Convert.ToBase64String(Encoding.UTF8.GetBytes($"{mail}_{Guid.NewGuid()}"));
}