using EShop.Application.Interfaces;
using EShop.Application.Services;
using EShop.Domain.Entities;
using Moq;

namespace EShop.UnitTests;

[TestClass]
public class ProductServiceTests
{
    private ProductService _productService;
    private Mock<IProductRepository> _productRepositoryMock;

    [TestInitialize]
    public void Setup()
    {
        _productRepositoryMock = new Mock<IProductRepository>();
        _productService = new ProductService(_productRepositoryMock.Object);
    }

    [TestMethod]
    public void GetAllProductsAsync_ReturnsEmptyList()
    {
        _productRepositoryMock
            .Setup(repo => repo.GetAllProductsAsync())
            .ReturnsAsync(new List<Product>());
        var result = _productService.GetProducts().Result;
        Assert.IsNotNull(result);
        Assert.AreEqual(0, result.Count());
    }

    [TestMethod]
    public void GetAllProductsAsync_ReturnsListOfProducts()
    {
        var products = new List<Product>
        {
            new Product { Id = 1, Name = "Product 1", Price = 10.0m },
            new Product { Id = 2, Name = "Product 2", Price = 20.0m }
        };
        _productRepositoryMock
            .Setup(repo => repo.GetAllProductsAsync())
            .ReturnsAsync(products);

        var result = _productService.GetProducts().Result;

        Assert.IsNotNull(result);
        Assert.AreEqual(2, result.Count());
    }

    [TestMethod]
    public void GetProductByIdAsync_ReturnsProduct_WhenProductExists()
    {
        var product = new Product { Id = 1, Name = "Product 1", Price = 10.0m };

        _productRepositoryMock
            .Setup(repo => repo.GetProductByIdAsync(1))
            .ReturnsAsync(product);

        var result = _productService.GetProduct(1).Result;

        Assert.IsNotNull(result);
        Assert.AreEqual(product.Id, result?.Id);
        Assert.AreEqual(product.Name, result?.Name);
    }

    [TestMethod]
    public void GetProductByIdAsync_ReturnsNull_WhenProductNotFound()
    {
        _productRepositoryMock
            .Setup(repo => repo.GetProductByIdAsync(It.IsAny<int>()))
            .ReturnsAsync((Product?)null);

        var result = _productService.GetProduct(1).Result;

        Assert.IsNull(result);
    }

    [TestMethod]
    public void AddProductAsync_CallsRepositoryAddMethod()
    {
        var product = new Product { Id = 1, Name = "New Product", Price = 15.0m };

        _productService.AddProduct(product).Wait();
        _productRepositoryMock.Verify(repo => repo.AddProductAsync(product), Times.Once);
    }
}
