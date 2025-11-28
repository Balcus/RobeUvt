using System.Diagnostics;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;

namespace Api.Middleware;

public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;
    private readonly IWebHostEnvironment _env;
    
    private const string UnhandledExceptionMessage = "An unhandled exception occurred.";

    private static readonly JsonSerializerOptions SerializerOptions = new(JsonSerializerDefaults.Web)
    {
        Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
    };

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger,  IWebHostEnvironment env)
    {
        _logger = logger;
        _env = env;
    }
    
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        // can later expand this in case of custom errors
        _logger.LogError(exception, UnhandledExceptionMessage);
        var problemDetails = CreateProblemDetails(httpContext, exception);
        var json = JsonSerializer.Serialize(problemDetails, SerializerOptions);;

        httpContext.Response.ContentType = "application/problem+json";
        await httpContext.Response.WriteAsync(json, cancellationToken);

        return true;
    }
    
    private ProblemDetails CreateProblemDetails(in HttpContext context, in Exception exception)
    {
        var statusCode = context.Response.StatusCode;
        
        if (statusCode == 200)
        {
            statusCode = StatusCodes.Status500InternalServerError;
            context.Response.StatusCode = statusCode;
        }
        
        var reasonPhrase = ReasonPhrases.GetReasonPhrase(statusCode);
        if (string.IsNullOrEmpty(reasonPhrase))
        {
            reasonPhrase = UnhandledExceptionMessage;
        }

        var problemDetails = new ProblemDetails
        {
            Status = statusCode,
            Title = reasonPhrase,
        };

        if (!_env.IsDevelopment())
        {
            return problemDetails;
        }

        problemDetails.Detail = exception.ToString();
        problemDetails.Extensions["traceId"] = Activity.Current?.Id;
        problemDetails.Extensions["requestId"] = context.TraceIdentifier;
        problemDetails.Extensions["data"] = exception.Data;

        return problemDetails;
    }
}