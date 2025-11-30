using Api.BusinessLogic.Services.Abstraction;
using RazorLight;

namespace Api.BusinessLogic.Services.Implementation;

public class RazorTemplateRenderer : ITemplateRenderer
{
    private readonly RazorLightEngine _engine;

    public RazorTemplateRenderer()
    {
        _engine = new RazorLightEngineBuilder()
            .UseFileSystemProject(Path.Combine(AppContext.BaseDirectory, "Templates"))
            .UseMemoryCachingProvider()
            .Build();
    }

    public async Task<string> RenderAsync<T>(string templateKey, T model)
    {
        return await _engine.CompileRenderAsync(templateKey, model);
    }
}
