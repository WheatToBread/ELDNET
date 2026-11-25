namespace Eldnet.Api.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Author { get; set; } = string.Empty;
        public string Condition { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        // The user who is selling this book (null for the seeded sample books)
        public string? SellerId { get; set; }
    }
}
