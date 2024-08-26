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

        public static Review ToReviewFromCreate(this CreateReviewDto reviewDto, int bookId) {

            return new Review {

                Title = reviewDto.Title,
                Body = reviewDto.Body,
                Rating = reviewDto.Rating,
                BookId = bookId
            };
        }
    }
}