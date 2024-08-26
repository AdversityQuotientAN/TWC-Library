using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Review;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/review")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepo;
        private readonly IBookRepository _bookRepo;

        public ReviewController(IReviewRepository reviewRepo, IBookRepository bookRepo)
        {
            _reviewRepo = reviewRepo;
            _bookRepo = bookRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            
            var reviews = await _reviewRepo.GetAllAsync();

            var reviewDto = reviews.Select(s => s.ToReviewDto());

            return Ok(reviewDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id) {
            
            var review = await _reviewRepo.GetByIdAsync(id);

            if (review == null) {
                return NotFound();
            }

            return Ok(review.ToReviewDto());
        }

        [HttpPost("{bookId}")]
        public async Task<IActionResult> Create([FromRoute] int bookId, CreateReviewDto reviewDto) {

            if (!await _bookRepo.BookExists(bookId)) {
                return BadRequest("Book does not exist");
            }

            var reviewModel = reviewDto.ToReviewFromCreate(bookId);

            await _reviewRepo.CreateAsync(reviewModel);

            return CreatedAtAction(nameof(GetById), new { id = reviewModel }, reviewModel.ToReviewDto());
        }
    }
}