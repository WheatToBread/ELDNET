using System.IdentityModel.Tokens.Jwt;
using Eldnet.Api.DTOs;
using Eldnet.Api.Models;
using Eldnet.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Eldnet.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly TokenService _tokenService;

    public AuthController(UserManager<ApplicationUser> userManager, TokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    // POST api/auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var user = new ApplicationUser
        {
            FullName = dto.FullName,
            Email = dto.Email,
            UserName = dto.Email
        };

        var result = await _userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded)
            return BadRequest(result.Errors.Select(e => e.Description));

        // Log them in right away so the frontend doesn't need a second call
        return Ok(BuildResponse(user));
    }

    // POST api/auth/login
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);

        // Same message for "no such user" and "wrong password" so attackers can't tell which emails exist
        if (user == null || !await _userManager.CheckPasswordAsync(user, dto.Password))
            return Unauthorized(new { message = "Invalid email or password" });

        return Ok(BuildResponse(user));
    }

    // GET api/auth/me  (needs a valid token; handy for the Profile page)
    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        var user = userId == null ? null : await _userManager.FindByIdAsync(userId);
        if (user == null) return Unauthorized();

        return Ok(new { user.Id, user.FullName, user.Email });
    }

    private AuthResponseDto BuildResponse(ApplicationUser user)
    {
        var (token, expires) = _tokenService.CreateToken(user);
        return new AuthResponseDto
        {
            Token = token,
            ExpiresAt = expires,
            FullName = user.FullName,
            Email = user.Email ?? string.Empty
        };
    }
}
