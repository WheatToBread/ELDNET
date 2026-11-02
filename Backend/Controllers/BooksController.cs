using Eldnet.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Eldnet.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private static readonly List<Book> books = new()
    {
        new Book { Id = 1, Title = "Book 1", Price = 9.99m, Author = "Author 1", Condition = "New", Description = "Description" },
        new Book { Id = 2, Title = "Book 2", Price = 14.99m, Author = "Author 2", Condition = "Used", Description = "Description" },
        new Book { Id = 3, Title = "Book 3", Price = 19.99m, Author = "Author 3", Condition = "New", Description = "Description" }
    };

    [HttpGet]
    public ActionResult<List<Book>> GetAll()
    {
        return books;
    }

    [HttpGet("{id}")]
    public ActionResult<Book> GetById(int id)
    {
        var book = books.FirstOrDefault(b => b.Id == id);
        if (book == null)
        {
            return NotFound();
        }
        return book;
    }

    // POST api/books  (used by SellBook page)
    [HttpPost]
    public ActionResult<Book> Create(Book newBook)
    {
        newBook.Id = books.Count == 0 ? 1 : books.Max(b => b.Id) + 1;
        books.Add(newBook);
        return CreatedAtAction(nameof(GetById), new { id = newBook.Id }, newBook);
    }

    // PUT api/books/2
    [HttpPut("{id}")]
    public IActionResult Update(int id, Book updatedBook)
    {
        var book = books.FirstOrDefault(b => b.Id == id);
        if (book == null)
        {
            return NotFound();
        }

        book.Title = updatedBook.Title;
        book.Author = updatedBook.Author;
        book.Price = updatedBook.Price;
        book.Condition = updatedBook.Condition;
        book.Description = updatedBook.Description;

        return NoContent();
    }

    // DELETE api/books/2
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var book = books.FirstOrDefault(b => b.Id == id);
        if (book == null)
        {
            return NotFound();
        }

        books.Remove(book);
        return NoContent();
    }
}