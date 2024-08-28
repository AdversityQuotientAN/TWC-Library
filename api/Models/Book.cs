using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;

namespace api.Models
{
    [Table("Books")]
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string CoverImage { get; set; } = string.Empty;
        public string Publisher { get; set; } = string.Empty;
        public DateTime PublicationDate { get; set; } = DateTime.Now;
        public string Category { get; set; } = string.Empty;
        public long ISBN { get; set; }
        public int PageCount { get; set; }
        public DateTime AvailableUntil { get; set; } = DateTime.Now;
        public List<Review> Reviews { get; set; } = new List<Review>();
        public List<Collection> Collections { get; set; } = new List<Collection>();
    }
}