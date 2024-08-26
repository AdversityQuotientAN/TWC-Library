using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Review;
using api.Models;

namespace api.Mappers
{
    public static class ReviewMapper
    {
        public static ReviewDto ToReviewDto(this Review reviewModel) {

            return new ReviewDto {

                Id = reviewModel.Id,
                Title = reviewModel.Title,
                Body = reviewModel.Body,
                CreatedOn = reviewModel.CreatedOn,
                Rating = reviewModel.Rating,
                BookId = reviewModel.BookId
            };
        }
    }
}