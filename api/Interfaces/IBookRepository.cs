using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Book;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IBookRepository
    {
        Task<List<Book>> GetAllAsync(QueryObject query); // Interfaces allow us to plug in this code to other places
        Task<Book?> GetByIdAsync(int id); // FirstOrDefault can be null
        Task<Book> CreateAsync(Book bookModel);
        Task<Book?> UpdateAsync(int id, UpdateBookRequestDto bookDto);
        Task<Book?> DeleteAsync(int id);
        Task<bool> BookExists(int id);
        Task<Book?> CheckoutAsync(int id);
        Task<Book?> ReturnAsync(int id);
    }
}