using EShop.Application.Services;
using EShop.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace EShop.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductsController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("featured")]
        public async Task<IActionResult> GetFeaturedProducts()
        {
            //var products = await _context.Products.Where(p => p.IsFeatured).ToListAsync();
            //return Ok(products);

            var filePath = Path.Combine(AppContext.BaseDirectory, "Data", "products.json");

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            if (!System.IO.File.Exists(filePath))
                return NotFound("Mock products file not found.");


            var json = System.IO.File.ReadAllText(filePath);
            var products = JsonSerializer.Deserialize<List<Product>>(json, options);

            var featured = (products ?? []).Where(p => p.IsFeatured).ToList();

            return Ok(featured);
        }


        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            //var products = await _productService.GetProducts();
            //return Ok(products);
            var filePath = Path.Combine(AppContext.BaseDirectory, "Data", "products.json");

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            if (!System.IO.File.Exists(filePath))
                return NotFound("Mock products file not found.");


            var json = System.IO.File.ReadAllText(filePath);
            var products = JsonSerializer.Deserialize<List<Product>>(json, options);

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            //var product = await _productService.GetProduct(id);
            //if (product == null)
            //{
            //    return NotFound();
            //}
            //return Ok(product);
            var filePath = Path.Combine(AppContext.BaseDirectory, "Data", "products.json");

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            if (!System.IO.File.Exists(filePath))
                return NotFound("Mock products file not found.");


            var json = System.IO.File.ReadAllText(filePath);
            var products = JsonSerializer.Deserialize<List<Product>>(json, options);
            var product = (products ?? []).FirstOrDefault(p => p.Id == id);

            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] Domain.Entities.Product product)
        {
            if (product == null)
            {
                return BadRequest("Product cannot be null");
            }
            await _productService.AddProduct(product);
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Domain.Entities.Product product)
        {
            if (product == null || product.Id != id)
            {
                return BadRequest("Product ID mismatch");
            }
            var existingProduct = await _productService.GetProduct(id);
            if (existingProduct == null)
            {
                return NotFound();
            }
            await _productService.UpdateProduct(product);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var existingProduct = await _productService.GetProduct(id);
            if (existingProduct == null)
            {
                return NotFound();
            }
            await _productService.DeleteProduct(id);
            return NoContent();
        }
    }
}
