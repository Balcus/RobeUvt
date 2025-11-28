namespace Api.BusinessLogic.Services.Abstraction;

public interface IMailService
{
    public Task SendMailAsync(string receptor, string subject, string body);
}