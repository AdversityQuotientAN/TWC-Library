using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Reviews")]
    public class Review
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int Rating { get; set; }
        public int? BookId { get; set; }
        public Book? Book { get; set; }     // Navigation property which allows us to access the Book model
        // public string AppUserId { get; set; }
        // public AppUser AppUser { get; set; }
    }
}