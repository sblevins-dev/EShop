using EShop.Application.DTOs;
using EShop.Application.Services;
using EShop.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EShop.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;

        public CartController(CartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCart(int userId)
        {
            var cart = await _cartService.GetCart(userId); // now returns DTOs
            return Ok(cart);
        }


        [HttpPost("{userId}/add")]
        public async Task<IActionResult> AddItem(int userId, [FromBody] CartItemDto dto)
        {
            await _cartService.AddItem(userId, dto.Product.Id, dto.Quantity);
            return Ok();
        }

        [HttpDelete("{userId}/remove/{productId}")]
        public async Task<IActionResult> RemoveItem(int userId, int productId)
        {
            await _cartService.RemoveItem(userId, productId);
            return Ok();
        }

        [HttpDelete("{userId}/clear")]
        public async Task<IActionResult> ClearCart(int userId)
        {
            await _cartService.ClearCart(userId);
            return Ok();
        }

        [HttpPost("{userId}/merge")]
        public async Task<IActionResult> MergeCart(int userId, [FromBody] List<CartItemDto> items)
        {
            await _cartService.MergeCart(userId, items);
            return Ok();
        }
    }
}
