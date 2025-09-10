using EShop.Domain.Entities;
using EShop.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace EShop.Infrastructure.Seeders
{
    public static class DbSeeder
    {
        public static async Task SeedProducts(EShopDBContext context)
        {
            if (!context.Products.Any())
            {
                var filePath = Path.Combine(AppContext.BaseDirectory, "Data", "products.json");

                if (!System.IO.File.Exists(filePath))
                {
                    throw new FileNotFoundException($"The file '{filePath}' was not found.");
                }

                // Replace this line:
                // var json = System.IO.File.ReadAllTextAsync(filePath);
                // with the following two lines:
                var json = await System.IO.File.ReadAllTextAsync(filePath);
                var products = JsonSerializer.Deserialize<List<Product>>(json,
                    new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                foreach (var product in products)
                {
                    var dbProduct = new Product
                    {
                        Id = product.Id,
                        Title = product.Title,
                        Description = product.Description,
                        Category = product.Category,
                        Price = product.Price,
                        DiscountPercentage = product.DiscountPercentage,
                        Rating = product.Rating,
                        Stock = product.Stock,
                        Tags = product.Tags,
                        Brand = product.Brand,
                        Sku = product.Sku,
                        Weight = product.Weight,
                        Dimensions = product.Dimensions,
                        WarrantyInformation = product.WarrantyInformation,
                        ShippingInformation = product.ShippingInformation,
                        AvailabilityStatus = product.AvailabilityStatus,
                        Reviews = product.Reviews,
                        ReturnPolicy = product.ReturnPolicy,
                        MinimumOrderQuantity = product.MinimumOrderQuantity,
                        Meta = product.Meta,
                        Images = product.Images,
                        Thumbnail = product.Thumbnail,
                        IsFeatured = product.IsFeatured
                    };
                    context.Products.Add(dbProduct);
                }

                await context.SaveChangesAsync();
            }
        }
    }
}
