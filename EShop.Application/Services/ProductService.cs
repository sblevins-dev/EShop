using EShop.Application.Interfaces;
using EShop.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Application.Services
{
    public class ProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public Task<IEnumerable<Product>> GetProducts() => _productRepository.GetAllProductsAsync();
        public Task<Product?> GetProduct(int id) => _productRepository.GetProductByIdAsync(id);
        public Task AddProduct(Product product) => _productRepository.AddProductAsync(product);
        public Task UpdateProduct(Product product) => _productRepository.UpdateProductAsync(product);
        public Task DeleteProduct(int id) => _productRepository.DeleteProductAsync(id);
    }
}
