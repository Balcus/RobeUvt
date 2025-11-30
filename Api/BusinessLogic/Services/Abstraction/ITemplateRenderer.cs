namespace Api.BusinessLogic.Services.Abstraction;

public interface ITemplateRenderer
{
    Task<string> RenderAsync<T>(string templateKey, T model);
}