using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Book;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult GetAll() {

            var books = _context.Books.ToList()
            .Select(s => s.ToBookDto());
            return Ok(books);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id) {

            var book = _context.Books.Find(id);
            if (book == null) {
                return NotFound();
            }
            return Ok(book.ToBookDto());
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateBookRequestDto bookDto) { // Need 'FromBody' since data is sent as JSON

            var bookModel = bookDto.ToBookFromCreateDto();
            _context.Books.Add(bookModel);
            _context.SaveChanges();
            // Executes GetById, passes in new object, then returns in the form of ToBookDto
            return CreatedAtAction(nameof(GetById), new { id = bookModel.Id }, bookModel.ToBookDto());
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateBookRequestDto updateDto) {   // id from route, body from body

            var bookModel = _context.Books.FirstOrDefault(x => x.Id == id);
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

            _context.SaveChanges();     // Sends to database

            return Ok(bookModel.ToBookDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id) {
            
            var bookModel = _context.Books.FirstOrDefault(x => x.Id == id);

            if (bookModel == null) {
                return NotFound();
            }

            _context.Books.Remove(bookModel);
            _context.SaveChanges();
            return NoContent();     // Returns 204 which is the success code for delete
        }
    }
}