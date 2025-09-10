using EShop.Application.Interfaces;
using EShop.Domain.Entities;
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

        public CartService(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        public async Task<Cart> GetCart(string userId) =>
            await _cartRepository.GetCartByUserIdAsync(userId);

        public async Task SaveCart(Cart cart) =>
            await _cartRepository.AddOrUpdateCartAsync(cart);

        public async Task ClearCart(string userId) =>
            await _cartRepository.ClearCartAsync(userId);
    }
}
