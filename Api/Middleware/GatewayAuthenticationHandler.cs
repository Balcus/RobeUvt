using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;

namespace Api.Middleware;

public class GatewayAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    public GatewayAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder) 
        : base(options, logger, encoder)
    {
    }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (Context.Request.Path.StartsWithSegments("/api/user/validate"))
        {
            return Task.FromResult(AuthenticateResult.NoResult());
        }
        
        if (!Context.Request.Headers.TryGetValue("x-user-id", out var userIdValue) || string.IsNullOrEmpty(userIdValue))
        {
            return Task.FromResult(AuthenticateResult.Fail(new UnauthorizedAccessException()));
        }

        var claims = new List<Claim>
        {
            new(ClaimTypes.Sid, userIdValue!)
        };

        if (Context.Request.Headers.TryGetValue("x-user-roles", out var rolesHeader) &&
            !string.IsNullOrEmpty(rolesHeader))
        {
            claims.AddRange(rolesHeader.ToString().Split(',')
                .Select(role => new Claim(ClaimTypes.Role, role.Trim())));
        }

        var identity = new ClaimsIdentity(claims, Scheme.Name);
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, Scheme.Name);

        return Task.FromResult(AuthenticateResult.Success(ticket));
    }
}