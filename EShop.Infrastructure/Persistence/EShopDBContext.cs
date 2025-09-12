using EShop.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Infrastructure.Persistence
{
    public class EShopDBContext : DbContext
    {
        public EShopDBContext(DbContextOptions<EShopDBContext> options) : base(options)
        {

        }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<User> Users => Set<User>();
        public DbSet<Cart> Carts => Set<Cart>();
        public DbSet<CartItem> CartItems => Set<CartItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().OwnsOne(p => p.Dimensions);
            modelBuilder.Entity<Product>().OwnsOne(p => p.Meta);
            modelBuilder.Entity<Product>().OwnsMany(p => p.Reviews);

            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<Product>()
                .Property(p => p.DiscountPercentage)
                .HasPrecision(5, 2);

            // User -> Cart (one-to-one)
            modelBuilder.Entity<User>()
                .HasOne(u => u.Cart)
                .WithOne(c => c.User)
                .HasForeignKey<Cart>(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict); // IMPORTANT: no cascade here

            // Cart -> CartItems (one-to-many)
            modelBuilder.Entity<Cart>()
                .HasMany(c => c.Items)
                .WithOne(i => i.Cart)
                .HasForeignKey(i => i.CartId)
                .OnDelete(DeleteBehavior.Cascade); // safe: deleting Cart deletes its items

            // CartItem -> Product (many-to-one)
            modelBuilder.Entity<CartItem>()
                .HasOne(i => i.Product)
                .WithMany()
                .HasForeignKey(i => i.ProductId)
                .OnDelete(DeleteBehavior.Restrict); // do not delete products


            base.OnModelCreating(modelBuilder);
        }
    }
}
