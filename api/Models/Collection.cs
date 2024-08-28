using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Collections")]
    public class Collection
    {
        public string AppUserId { get; set; }
        public int BookId { get; set; }
        public AppUser AppUser { get; set; } // Navigate property
        public Book Book { get; set; } // Navigate property
    }
}