var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres")
    .WithDataVolume(isReadOnly: false)
    .WithLifetime(ContainerLifetime.Persistent)
    .WithPgAdmin()
    .AddDatabase("appdb");

var maildev = builder.AddContainer("maildev", "maildev/maildev")
    .WithHttpEndpoint(port: 1080, targetPort: 1080, name: "web")
    .WithEndpoint(port: 1025, targetPort: 1025, name: "smtp");

var api = builder.AddProject<Projects.Api>("api")
    .WithReference(postgres)
    .WithReference(maildev.GetEndpoint("smtp"))
    .WithReference(maildev.GetEndpoint("web"));

var gateway = builder.AddProject<Projects.Gateway>("gateway")
    .WithReference(api)
    .WaitFor(api)
    .WithExternalHttpEndpoints();

builder.AddViteApp(name: "frontend", workingDirectory: "../frontend")
    .WithReference(gateway)
    .WaitFor(gateway)
    .WithNpmPackageInstallation();

builder.Build().Run();
