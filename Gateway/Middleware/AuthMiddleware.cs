using System.Security.Claims;

namespace Gateway.Middleware;

public class AuthMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        var isAuthenticated = context.User.Identity?.IsAuthenticated ?? false;
        var userRoles = string.Empty;
        var userId = string.Empty;

        if (isAuthenticated)
        {
            userId = context.User.Claims
                .FirstOrDefault(x => x.Type == ClaimTypes.Sid)?.Value;

            var roles = context.User.Claims
                .Where(x => x.Type == ClaimTypes.Role)
                .Select(x => x.Value)
                .ToList();

            if (roles.Count != 0)
            {
                userRoles = string.Join(",", roles);
            }
        }

        context.Request.Headers["x-user-authenticated"] = isAuthenticated.ToString();
        context.Request.Headers["x-user-id"] = userId;
        context.Request.Headers["x-user-roles"] = userRoles;

        await next(context);
    }
}