using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {
            
        }

        // Links DB to actual code
        public DbSet<Book> Books { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Collection> Collections { get; set; }

        // Before we log anyone in, there has to be at least 1 role
        protected override void OnModelCreating(ModelBuilder builder) {

            base.OnModelCreating(builder);

            // Foreign keys
            builder.Entity<Collection>(x => x.HasKey(p => new { p.AppUserId, p.BookId }));

            builder.Entity<Collection>()
                .HasOne(u => u.AppUser)
                .WithMany(u => u.Collections)
                .HasForeignKey(p => p.AppUserId);

            builder.Entity<Collection>()
                .HasOne(u => u.Book)
                .WithMany(u => u.Collections)
                .HasForeignKey(p => p.BookId);
            
            List<IdentityRole> roles = new List<IdentityRole> {
                new IdentityRole {
                    Name = "Librarian",
                    NormalizedName = "LIBRARIAN"
                },
                new IdentityRole {
                    Name = "Customer",
                    NormalizedName = "CUSTOMER"
                }
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}