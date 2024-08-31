using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Bogus;

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

        public static List<Book> GetRandomBooks(int numBooks) {
            var faker = new Faker<Book>()
                .RuleFor(b => b.Id, f => f.IndexFaker + 1)
                .RuleFor(b => b.Title, f => String.Join(" ", f.Lorem.Words()))
                .RuleFor(b => b.Author, f => f.Name.FullName())
                .RuleFor(b => b.Description, f => String.Join(" ", f.Random.Words()))
                .RuleFor(b => b.CoverImage, f => f.Image.ToString())
                .RuleFor(b => b.Publisher, f => f.Company.CompanyName())
                .RuleFor(b => b.PublicationDate, f => f.Date.Past(100))
                .RuleFor(b => b.Category, f => f.Lorem.Word())
                .RuleFor(b => b.ISBN, f => f.Random.Int())
                .RuleFor(b => b.PageCount, f => f.Random.Int())
                .RuleFor(b => b.AvailableUntil, f => f.Date.Past(5));
            var books = faker.Generate(numBooks);
            return books;
        }

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
            
            // Seed roles
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

            // Seed books
            List<Book> books = [
                new Book {
                    Id = -2,
                    Title = "The Great Gatsby",
                    Author = "F. Scott Fitzgerald",
                    Description = "A mysterious millionaire who wants to reunite with his former lover",
                    CoverImage = "Gatsby.png",
                    Publisher = "Charles Scribner's Sons",
                    PublicationDate = new DateTime(1925, 4, 10),
                    Category = "Realism",
                    ISBN = 9780743273565,
                    PageCount = 180,
                    AvailableUntil = new DateTime()
                },
                new Book {
                    Id = -1,
                    Title = "The Hunger Games",
                    Author = "Suzanne Collins",
                    Description = "A twisted battle royale for entertainment",
                    CoverImage = "HungerGames.png",
                    Publisher = "Scholastic Press",
                    PublicationDate = new DateTime(2008, 9, 14),
                    Category = "Dystopian",
                    ISBN = 9780439023481,
                    PageCount = 384,
                    AvailableUntil = new DateTime()
                },
                .. GetRandomBooks(4),
            ];
            builder.Entity<Book>().HasData(books);
        }
    }
}