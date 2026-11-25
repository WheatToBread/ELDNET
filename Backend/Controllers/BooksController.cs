using System.IdentityModel.Tokens.Jwt;
using Eldnet.Api.Data;
using Eldnet.Api.DTOs;
using Eldnet.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Eldnet.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public BooksController(ApplicationDbContext db)
    {
        _db = db;
    }

    private string? CurrentUserId => User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

    // GET api/books  (public: BrowseBooks page)
    [HttpGet]
    public async Task<ActionResult<List<Book>>> GetAll()
    {
        return await _db.Books.AsNoTracking().OrderBy(b => b.Id).ToListAsync();
    }

    // GET api/books/2  (public: BookDetails page)
    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetById(int id)
    {
        var book = await _db.Books.AsNoTracking().FirstOrDefaultAsync(b => b.Id == id);
        if (book == null) return NotFound();
        return book;
    }

    // POST api/books  (SellBook page; must be logged in)
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Book>> Create(BookDto dto)
    {
        var book = new Book
        {
            Title = dto.Title,
            Author = dto.Author,
            Price = dto.Price,
            Condition = dto.Condition,
            Description = dto.Description,
            SellerId = CurrentUserId
        };

        _db.Books.Add(book);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = book.Id }, book);
    }

    // PUT api/books/2  (only the seller can edit)
    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, BookDto dto)
    {
        var book = await _db.Books.FindAsync(id);
        if (book == null) return NotFound();
        if (book.SellerId != CurrentUserId) return Forbid();

        book.Title = dto.Title;
        book.Author = dto.Author;
        book.Price = dto.Price;
        book.Condition = dto.Condition;
        book.Description = dto.Description;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    // DELETE api/books/2  (only the seller can delete)
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var book = await _db.Books.FindAsync(id);
        if (book == null) return NotFound();
        if (book.SellerId != CurrentUserId) return Forbid();

        _db.Books.Remove(book);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
