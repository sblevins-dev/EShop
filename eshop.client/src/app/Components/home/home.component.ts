import { Component, inject, OnInit } from '@angular/core';
import { Product, ProductService } from '../../Services/product.service';
import { CartService } from '../../Services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.title} has been added to the cart.`);
  }

  goToCategory(category: string) {
    this.router.navigate(['/products'], { queryParams: { category } });
  }
}
