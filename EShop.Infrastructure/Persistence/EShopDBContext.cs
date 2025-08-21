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
    }
}
