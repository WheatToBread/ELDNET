using System.ComponentModel.DataAnnotations;

namespace Eldnet.Api.Models;

public class Book
{
    public int Id { get; set; }

    [Required, StringLength(200)]
    public string Title { get; set; } = "";

    [Required, StringLength(100)]
    public string Author { get; set; } = "";

    [Range(0.01, 100000)]
    public decimal Price { get; set; }

    [Required]
    public string Condition { get; set; } = "";

    [StringLength(2000)]
    public string Description { get; set; } = "";
}