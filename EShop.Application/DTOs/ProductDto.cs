using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Application.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal Price { get; set; }

        // Example additional info
        public string Description { get; set; } = string.Empty;
        public string Thumbnail { get; set; } = string.Empty;
        public int Stock { get; set; }

        // If you have a nested object, include only needed fields
        public DimensionsDto? Dimensions { get; set; }
        public string? Category { get; set; }
    }
}
