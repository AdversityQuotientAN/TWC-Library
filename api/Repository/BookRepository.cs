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
    public class BookRepository : IBookRepository
    {
        private readonly ApplicationDbContext _context;
        public BookRepository(ApplicationDbContext context) // Brings in database before use it
        {
            _context = context;   
        }
        public Task<List<Book>> GetAllAsync()
        {
            return _context.Books.ToListAsync();
        }
    }
}