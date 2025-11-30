using System.Net;
using System.Net.Mail;
using Api.BusinessLogic.Services.Abstraction;

namespace Api.BusinessLogic.Services.Implementation;

public class MailService : IMailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<MailService> _logger;
    private readonly ITemplateRenderer _templateRenderer;

    public MailService(
        IConfiguration configuration, 
        ILogger<MailService> logger, 
        ITemplateRenderer templateRenderer)
    {
        _configuration = configuration;
        _logger = logger;
        _templateRenderer = templateRenderer;
    }

    public async Task SendMailAsync<T>(string receptor, string subject, string templateName, T model) 
        where T : class
    {
        var body = await _templateRenderer.RenderAsync(templateName, model);
        var smtpEndpoint = _configuration["services:maildev:smtp:0"];

        string host;
        int port;
        bool enableSsl;

        if (!string.IsNullOrEmpty(smtpEndpoint))
        {
            var uri = new Uri(smtpEndpoint);
            host = uri.Host;
            port = uri.Port;
            enableSsl = false;
        }
        else
        {
            host = _configuration.GetValue<string>("EmailConfiguration:Host") 
                   ?? throw new InvalidOperationException("EmailConfiguration:Host is not configured");
            port = _configuration.GetValue<int>("EmailConfiguration:Port");
            enableSsl = _configuration.GetValue<bool>("EmailConfiguration:EnableSsl", true);
        }

        var senderEmail = _configuration.GetValue<string>("EmailConfiguration:Email") 
                          ?? "noreply@localhost";

        var password = _configuration.GetValue<string>("EmailConfiguration:Password") ?? "";

        using var smtpClient = new SmtpClient(host, port)
        {
            EnableSsl = enableSsl,
            UseDefaultCredentials = false,
            Credentials = string.IsNullOrEmpty(password) 
                ? null 
                : new NetworkCredential(senderEmail, password)
        };

        using var message = new MailMessage(senderEmail, receptor, subject, body)
        {
            IsBodyHtml = true
        };

        try
        {
            await smtpClient.SendMailAsync(message);
            _logger.LogInformation("Email sent successfully to {Receptor}", receptor);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email to {Receptor}", receptor);
            throw;
        }
    }
}
