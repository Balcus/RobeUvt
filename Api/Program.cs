using Api.BusinessLogic.Services.Abstraction;
using Api.BusinessLogic.Services.Implementation;
using Api.DataAccess;
using Api.DataAccess.Abstractions;
using Api.DataAccess.Entities;
using Api.Middleware;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
builder.Services.AddAuthentication("GatewayAuthentication")
    .AddScheme<AuthenticationSchemeOptions, GatewayAuthenticationHandler>(
        "GatewayAuthentication", options => {}
    );
builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = null;
});
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.AddNpgsqlDbContext<DatabaseContext>("appdb");
builder.Services.AddOpenApi();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddRouting(options =>
{
    options.LowercaseUrls = true;
    options.LowercaseQueryStrings = true;
});


builder.Services.AddControllers();

builder.Services.AddTransient<IMailService, MailService>();
builder.Services.AddTransient<IRepository<User, string>, BaseRepository<User, string>>();
builder.Services.AddTransient<IUserService, UserService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetService<DatabaseContext>();
    await dbContext!.Database.MigrateAsync();
}

app.UseExceptionHandler();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.Run();