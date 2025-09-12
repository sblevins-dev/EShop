﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EShop.Domain.Entities
{
    public class CartItem
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
        public int UserId { get; set; }
        public int Quantity { get; set; }
        public Cart Cart { get; set; } = null!;
    }
}
