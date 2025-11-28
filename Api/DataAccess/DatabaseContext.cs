using Api.DataAccess.Entities;
using Api.DataAccess.Enums;
using Microsoft.EntityFrameworkCore;

namespace Api.DataAccess;

public class DatabaseContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresEnum<Role>();
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DatabaseContext).Assembly);
    }
}