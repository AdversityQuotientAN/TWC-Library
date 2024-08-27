using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class QueryObject
    {
        public string? Title { get; set; } = null;
        public string? Author { get; set; } = null;
        public DateTime? Availability { get; set; } = null;

        public string? SortBy { get; set; } = null;

        public bool IsDescending { get; set; } = false;
    }
}