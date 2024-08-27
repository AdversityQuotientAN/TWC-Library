using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Review
{
    public class CreateReviewDto
    {
        [Required]
        [MaxLength(255, ErrorMessage = "Title can't be over 255 characters!")]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Body { get; set; } = string.Empty;
        [Required]
        public int Rating { get; set; }
    }
}