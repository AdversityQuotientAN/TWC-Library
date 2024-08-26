using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Book;
using api.Models;

namespace api.Mappers
{
    public static class BookMappers // Extension methods, so static
    {
        public static BookDto ToBookDto(this Book bookModel) {

            return new BookDto {
                Id = bookModel.Id,
                Title = bookModel.Title,
                Author = bookModel.Author,
                CoverImage = bookModel.CoverImage,
                Description = bookModel.Description
            };
        }

        public static Book ToBookFromCreateDto(this CreateBookRequestDto bookDto) {

            return new Book {

                Title = bookDto.Title,
                Author = bookDto.Author,
                CoverImage = bookDto.CoverImage,
                Description = bookDto.Description,
                Publisher = bookDto.Publisher,
                PublicationDate = bookDto.PublicationDate,
                Category = bookDto.Category,
                ISBN = bookDto.ISBN,
                PageCount = bookDto.PageCount
            };
        }
    }
}