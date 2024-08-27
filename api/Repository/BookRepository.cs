using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Book;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class BookRepository : IBookRepository   // Repos are there for database calls
    {
        private readonly ApplicationDbContext _context;
        public BookRepository(ApplicationDbContext context) // Brings in database before using it
        {
            _context = context;   
        }

        public Task<bool> BookExists(int id)
        {
            return _context.Books.AnyAsync(b => b.Id == id);
        }

        public async Task<Book> CreateAsync(Book bookModel)
        {
            await _context.Books.AddAsync(bookModel);
            await _context.SaveChangesAsync();
            return bookModel;
        }

        public async Task<Book?> DeleteAsync(int id)
        {
            var bookModel = await _context.Books.FirstOrDefaultAsync(x => x.Id == id);

            if (bookModel == null) {
                return null;
            }

            _context.Books.Remove(bookModel);   // Remove() is not an async function
            await _context.SaveChangesAsync();
            return bookModel;
        }

        public async Task<List<Book>> GetAllAsync(QueryObject query)
        {
            var books = _context.Books.Include(c => c.Reviews).AsQueryable();

            // Search for books by text that's partially contained in book's title
            if (!string.IsNullOrWhiteSpace(query.Title)) {
                books = books.Where(b => b.Title.Contains(query.Title));
            }
            // Filter by author
            if (!string.IsNullOrWhiteSpace(query.Author)) {
                books = books.Where(b => b.Author.Contains(query.Author));
            }
            // Filter by availability
            if (query.Availability.HasValue) {
                books = books.Where(b => b.AvailableUntil < query.Availability);
            }

            // Sort by title
            if(!string.IsNullOrWhiteSpace(query.SortBy)) {
                if(query.SortBy.Equals("Title", StringComparison.OrdinalIgnoreCase)) {
                    books = query.IsDescending ? books.OrderByDescending(b => b.Title) : books.OrderBy(b => b.Title);
                }
            }
            // Sort by author
            if(!string.IsNullOrWhiteSpace(query.SortBy)) {
                if(query.SortBy.Equals("Author", StringComparison.OrdinalIgnoreCase)) {
                    books = query.IsDescending ? books.OrderByDescending(b => b.Author) : books.OrderBy(b => b.Author);
                }
            }
            // Sort by availability
            if(!string.IsNullOrWhiteSpace(query.SortBy)) {
                if(query.SortBy.Equals("Availability", StringComparison.OrdinalIgnoreCase)) {
                    books = query.IsDescending ? books.OrderByDescending(b => b.AvailableUntil) : books.OrderBy(b => b.AvailableUntil);
                }
            }

            return await books.ToListAsync();
        }

        public async Task<Book?> GetByIdAsync(int id)
        {
            return await _context.Books.Include(c => c.Reviews).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Book?> UpdateAsync(int id, UpdateBookRequestDto bookDto)
        {
            var bookModel = await _context.Books.FirstOrDefaultAsync(x => x.Id == id);

            if (bookModel == null) {
                return null;
            }

            bookModel.Title = bookDto.Title;
            bookModel.Author = bookDto.Author;
            bookModel.Publisher = bookDto.Publisher;
            bookModel.PublicationDate = bookDto.PublicationDate;
            bookModel.Category = bookDto.Category;
            bookModel.CoverImage = bookDto.CoverImage;
            bookModel.PageCount = bookDto.PageCount;
            bookModel.ISBN = bookDto.ISBN;
            bookModel.Description = bookDto.Description;

            await _context.SaveChangesAsync();     // Sends to database

            return bookModel;
        }

        public async Task<Book?> CheckoutAsync(int id) {

            var bookModel = await _context.Books.FirstOrDefaultAsync(x => x.Id == id);

            if (bookModel == null) {
                return null;
            }

            // Check if book is available
            if (bookModel.AvailableUntil > DateTime.Now) {
                return null;
            }

            bookModel.AvailableUntil = DateTime.Now.AddDays(5);

            await _context.SaveChangesAsync();

            return bookModel;
        }

        public async Task<Book?> ReturnAsync(int id)
        {
            var bookModel = await _context.Books.FirstOrDefaultAsync(x => x.Id == id);

            if (bookModel == null) {
                return null;
            }

            // Check if book is current being borrowed
            if (bookModel.AvailableUntil < DateTime.Now) {
                return null;
            }

            bookModel.AvailableUntil = DateTime.Now;

            await _context.SaveChangesAsync();

            return bookModel;
        }
    }
}