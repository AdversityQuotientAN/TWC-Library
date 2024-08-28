using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CollectionRepository : ICollectionRepository
    {
        private readonly ApplicationDbContext _context;
        public CollectionRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<Book>> GetUserCollection(AppUser user)
        {
            return await _context.Collections.Where(c => c.AppUserId == user.Id)
            .Select(book => new Book {
                Id = book.BookId,
                Title = book.Book.Title,
                Author = book.Book.Author,
                Description = book.Book.Description,
                CoverImage = book.Book.CoverImage,
                Publisher = book.Book.Publisher,
                PublicationDate = book.Book.PublicationDate,
                Category = book.Book.Category,
                ISBN = book.Book.ISBN,
                PageCount = book.Book.PageCount,
                AvailableUntil = book.Book.AvailableUntil
            }).ToListAsync();
        }
    }
}