using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly ApplicationDbContext _context;
        public ReviewRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Review> CreateAsync(Review reviewModel)
        {
            await _context.Reviews.AddAsync(reviewModel);
            await _context.SaveChangesAsync();
            return reviewModel;
        }

        public async Task<List<Review>> GetAllAsync()
        {
            return await _context.Reviews.ToListAsync();
        }

        public async Task<Review?> GetByIdAsync(int id)
        {
            return await _context.Reviews.FindAsync(id);
        }

        public async Task<Review?> UpdateAsync(int id, Review reviewModel)
        {
            var review = await _context.Reviews.FindAsync(id);

            if (review == null) {
                return null;
            }

            review.Title = reviewModel.Title;
            review.Body = reviewModel.Body;
            review.Rating = reviewModel.Rating;

            await _context.SaveChangesAsync();

            return review;
        }
    }
}