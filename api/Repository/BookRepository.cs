using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Book;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class BookRepository : IBookRepository   // Repos are there for database calls
    {
        private readonly ApplicationDbContext _context;
        public BookRepository(ApplicationDbContext context) // Brings in database before use it
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

        public async Task<List<Book>> GetAllAsync()
        {
            return await _context.Books.Include(c => c.Reviews).ToListAsync();
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
    }
}