using Gateway.Middleware;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
builder.Services.AddTransient<AuthMiddleware>();
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie();
builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services
    .AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"))
    .AddServiceDiscoveryDestinationResolver();

builder.Services.AddHttpClient("api", client =>
{
    client.BaseAddress = new Uri("http://api");
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactClient", policy =>
    {
        policy.SetIsOriginAllowed(origin => 
                new Uri(origin).Host == "localhost")
            .AllowCredentials()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowReactClient");
app.UseForwardedHeaders();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapReverseProxy(proxyPipeline =>
{
    proxyPipeline.UseMiddleware<AuthMiddleware>();
});

app.Run();