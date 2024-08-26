using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Book;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/book")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public BookController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {

            var books = await _context.Books.ToListAsync();

            var bookDto = books.Select(s => s.ToBookDto());

            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id) {

            var book = await _context.Books.FindAsync(id);
            if (book == null) {
                return NotFound();
            }
            return Ok(book.ToBookDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBookRequestDto bookDto) { // Need 'FromBody' since data is sent as JSON

            var bookModel = bookDto.ToBookFromCreateDto();
            await _context.Books.AddAsync(bookModel);
            await _context.SaveChangesAsync();   // Anything going to database needs await
            // Executes GetById, passes in new object, then returns in the form of ToBookDto
            return CreatedAtAction(nameof(GetById), new { id = bookModel.Id }, bookModel.ToBookDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateBookRequestDto updateDto) {   // id from route, body from body

            var bookModel = await _context.Books.FirstOrDefaultAsync(x => x.Id == id);
            if (bookModel == null) {
                return NotFound();
            }
            bookModel.Title = updateDto.Title;
            bookModel.Author = updateDto.Author;
            bookModel.Publisher = updateDto.Publisher;
            bookModel.PublicationDate = updateDto.PublicationDate;
            bookModel.Category = updateDto.Category;
            bookModel.CoverImage = updateDto.CoverImage;
            bookModel.PageCount = updateDto.PageCount;
            bookModel.ISBN = updateDto.ISBN;
            bookModel.Description = updateDto.Description;

            await _context.SaveChangesAsync();     // Sends to database

            return Ok(bookModel.ToBookDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id) {
            
            var bookModel = await _context.Books.FirstOrDefaultAsync(x => x.Id == id);

            if (bookModel == null) {
                return NotFound();
            }

            _context.Books.Remove(bookModel);   // Remove() is not an async function
            await _context.SaveChangesAsync();
            return NoContent();     // Returns 204 which is the success code for delete
        }
    }
}