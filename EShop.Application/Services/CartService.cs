using EShop.Application.DTOs;
using EShop.Application.Interfaces;
using EShop.Domain.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Application.Services
{
    public class CartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly string _baseUrl;

        public CartService(ICartRepository cartRepository, IConfiguration configuration)
        {
            _cartRepository = cartRepository;
            _baseUrl = configuration["AppSettings:BaseUrl"] ?? "http://localhost:5000";
        }

        public async Task<List<CartItemDto>> GetCart(int userId)
        {
            var cart = await _cartRepository.GetCartByUserIdAsync(userId);

            if (cart == null || cart.Items == null)
                return new List<CartItemDto>();

            return cart.Items.Select(ci => new CartItemDto
            {
                Id = ci.ProductId,
                Quantity = ci.Quantity,
                Product = new ProductDto
                {
                    Id = ci.Product.Id,
                    Title = ci.Product.Title,
                    Price = ci.Product.Price,
                    Thumbnail =  $"{_baseUrl}/{ci.Product.Thumbnail}",
                }
            }).ToList();
        }

        public async Task AddItem(int userId, int productId, int quantity) =>
            await _cartRepository.AddItemToCartAsync(userId, productId, quantity);

        public async Task RemoveItem(int userId, int productId) =>
            await _cartRepository.RemoveItemFromCartAsync(userId, productId);

        public async Task ClearCart(int userId) =>
            await _cartRepository.ClearCartAsync(userId);
    }
}
