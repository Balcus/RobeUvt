using System.Text;
using Api.BusinessLogic.Dto.UserDto;
using Api.DataAccess.Entities;
using AutoMapper;
using QRCoder;

namespace Api.BusinessLogic.Mapping.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<UserCreateDto, User>()
            .ForMember(dest => dest.UserCode, opt => opt.MapFrom(src => GenerateUserCode(src.Mail)));
        
        CreateMap<User, UserGetDto>();
        CreateMap<User, UserValidateResponseDto>();
        CreateMap<User, UserCreatedEmailModel>()
            .ForMember(dest => dest.QrCodeBase64, opt => opt.MapFrom(src => GenerateQrCode(src.UserCode)));
    }

    private static string GenerateUserCode(string mail) => Convert.ToBase64String(Encoding.UTF8.GetBytes($"{mail}_{Guid.NewGuid()}"));

    private static string GenerateQrCode(string data)
    {
        var generator = new QRCodeGenerator();
        QRCodeData qrCodeData = generator.CreateQrCode(data, QRCodeGenerator.ECCLevel.Q);
        PngByteQRCode qrCode = new PngByteQRCode(qrCodeData);
        byte[] qrCodeBytes = qrCode.GetGraphic(20);
        return Convert.ToBase64String(qrCodeBytes);
    }
}