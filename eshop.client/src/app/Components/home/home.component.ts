import { Component, inject, OnInit } from '@angular/core';
import { Product, ProductService } from '../../Services/product.service';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.name} has been added to the cart.`);
  }
}
