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

            // Does all the validation
            // ModelState inherited from ControllerBase
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var reviews = await _reviewRepo.GetAllAsync();

            var reviewDto = reviews.Select(s => s.ToReviewDto());

            return Ok(reviewDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id) {
            
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var review = await _reviewRepo.GetByIdAsync(id);

            if (review == null) {
                return NotFound();
            }

            return Ok(review.ToReviewDto());
        }

        [HttpPost("{bookId:int}")]
        public async Task<IActionResult> Create([FromRoute] int bookId, CreateReviewDto reviewDto) {

            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            if (!await _bookRepo.BookExists(bookId)) {
                return BadRequest("Book does not exist");
            }

            var reviewModel = reviewDto.ToReviewFromCreate(bookId);

            await _reviewRepo.CreateAsync(reviewModel);

            return CreatedAtAction(nameof(GetById), new { id = reviewModel.Id }, reviewModel.ToReviewDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateReviewRequestDto updateDto) {

            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var review = await _reviewRepo.UpdateAsync(id, updateDto.ToReviewFromUpdate());

            if (review == null) {
                return NotFound("Review not found");
            }

            return Ok(review.ToReviewDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id) {

            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var review = await _reviewRepo.DeleteAsync(id);

            if (review == null) {
                return NotFound("Review doesn't exist!");
            }

            return Ok(review);
        }
    }
}