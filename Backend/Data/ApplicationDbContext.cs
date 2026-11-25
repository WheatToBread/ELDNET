using Eldnet.Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Eldnet.Api.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Book> Books => Set<Book>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder); // required for Identity tables

            builder.Entity<Book>(e =>
            {
                e.Property(b => b.Title).IsRequired().HasMaxLength(200);
                e.Property(b => b.Author).IsRequired().HasMaxLength(200);
                e.Property(b => b.Condition).HasMaxLength(50);
                e.Property(b => b.Description).HasMaxLength(2000);

                // Book -> seller. If the user is deleted, the book stays (SellerId becomes null).
                e.HasOne<ApplicationUser>()
                 .WithMany()
                 .HasForeignKey(b => b.SellerId)
                 .OnDelete(DeleteBehavior.SetNull);

                // Sample data (same books you had in the static list)
                e.HasData(
                    new Book { Id = 1, Title = "Book 1", Price = 9.99m,  Author = "Author 1", Condition = "New",  Description = "Description" },
                    new Book { Id = 2, Title = "Book 2", Price = 14.99m, Author = "Author 2", Condition = "Used", Description = "Description" },
                    new Book { Id = 3, Title = "Book 3", Price = 19.99m, Author = "Author 3", Condition = "New",  Description = "Description" }
                );
            });
        }
    }
}
