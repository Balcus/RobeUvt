using System.Net;
using System.Net.Mail;
using Api.BusinessLogic.Services.Abstraction;

namespace Api.BusinessLogic.Services.Implementation;

public class MailService : IMailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<MailService> _logger;
    
    public MailService(IConfiguration configuration, ILogger<MailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task SendMailAsync(string receptor, string subject, string body)
    {
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
        
        var email = _configuration.GetValue<string>("EmailConfiguration:Email") ?? "noreply@localhost";
        var password = _configuration.GetValue<string>("EmailConfiguration:Password") ?? "";

        using var smtpClient = new SmtpClient(host, port);
        smtpClient.EnableSsl = enableSsl;
        smtpClient.UseDefaultCredentials = false;
        smtpClient.Credentials = string.IsNullOrEmpty(password) 
            ? null 
            : new NetworkCredential(email, password);

        using var message = new MailMessage(email, receptor, subject, body);
        
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