namespace Api.BusinessLogic.Services.Abstraction;

public interface IMailService
{
    Task SendMailAsync<T>(string receptor, string subject, string templateName, T model) where T : class;
}