using System.ComponentModel.DataAnnotations;

namespace Eldnet.Api.DTOs
{
    // What the SellBook page sends when creating/updating a book
    public class BookDto
    {
        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required, StringLength(200)]
        public string Author { get; set; } = string.Empty;

        [Range(0, 100000, ErrorMessage = "Price must be 0 or more")]
        public decimal Price { get; set; }

        [StringLength(50)]
        public string Condition { get; set; } = string.Empty;

        [StringLength(2000)]
        public string Description { get; set; } = string.Empty;
    }
}
