using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IBookRepository
    {
        Task<List<Book>> GetAllAsync(); // Interfaces allow us to plug in this code to other places
    }
}