using Api.DataAccess.Entities;
using Api.DataAccess.Enums;
using Microsoft.EntityFrameworkCore;

namespace Api.DataAccess;

public class DatabaseContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Faculty> Faculties { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresEnum<Role>();
        modelBuilder.HasPostgresEnum<Gender>();
        modelBuilder.HasPostgresEnum<CapSize>();
        modelBuilder.HasPostgresEnum<GownSize>();
        modelBuilder.HasPostgresEnum<StudyCycle>();
        modelBuilder.HasPostgresEnum<Promotion>();
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DatabaseContext).Assembly);
        
        // TODO: add all faculties here
        modelBuilder.Entity<Faculty>().HasData(
        new Faculty()
        {
            Id = 1,
            Name = "Necunsocut"
        },
        new Faculty{
            Id = 2,
            Name = "Facultatea de Informatica"
        }, 
        new Faculty()
        {
            Id = 3,
            Name = "Facultatea de Matematica"
        });
    }
}