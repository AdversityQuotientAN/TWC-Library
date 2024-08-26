using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public ReviewController(IReviewRepository repo)
        {
            _reviewRepo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            
            var reviews = await _reviewRepo.GetAllAsync();

            var reviewDto = reviews.Select(s => s.ToReviewDto());

            return Ok(reviewDto);
        }
    }
}