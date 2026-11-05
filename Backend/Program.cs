using Eldnet.Api.DTOs;
using System.ComponentModel.DataAnnotations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// CORS: define the policy (must be before builder.Build())
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});
var RegisterDto = new RegisterDto
{
    FullName = "John Doe",
    Email = "john@gmail.com",
    Password = "123",
    ConfirmPassword = "123!!"
};

var results = new List<ValidationResult>();
bool isValid = Validator.TryValidateObject(RegisterDto, new ValidationContext(RegisterDto), results, true);
Console.WriteLine($"Is RegisterDto valid? {isValid}");

foreach(var result in results)
{
    Console.WriteLine($"Validation error: {result.ErrorMessage}");
}

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// CORS: apply the policy (after redirection, before authorization)
app.UseCors("Frontend");

app.UseAuthorization();

app.MapControllers();

app.Run();