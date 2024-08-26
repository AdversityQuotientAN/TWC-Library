using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Book;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers   // Controllers are for manipulating the URLs, not for databases
{
    [Route("api/book")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IBookRepository _bookRepo;
        public BookController(ApplicationDbContext context, IBookRepository bookRepo)
        {
            _bookRepo = bookRepo;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {

            var books = await _bookRepo.GetAllAsync();

            var bookDto = books.Select(s => s.ToBookDto());

            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id) {

            var book = await _bookRepo.GetByIdAsync(id);
            
            if (book == null) {
                return NotFound();
            }
            
            return Ok(book.ToBookDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBookRequestDto bookDto) { // Need 'FromBody' since data is sent as JSON

            var bookModel = bookDto.ToBookFromCreateDto();

            await _bookRepo.CreateAsync(bookModel);

            // Executes GetById, passes in new object, then returns in the form of ToBookDto
            return CreatedAtAction(nameof(GetById), new { id = bookModel.Id }, bookModel.ToBookDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateBookRequestDto updateDto) {   // id from route, body from body

            var bookModel = await _bookRepo.UpdateAsync(id, updateDto);

            if (bookModel == null) {
                return NotFound();
            }

            return Ok(bookModel.ToBookDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id) {
            
            var bookModel = await _bookRepo.DeleteAsync(id);

            if (bookModel == null) {
                return NotFound();
            }

            return NoContent();     // Returns 204 which is the success code for delete
        }
    }
}