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
  showToast = false;
  toastMessage = '';

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe(products => {
      products.forEach(p => {
        p.thumbnail = this.productService.getFullImageUrl(p.thumbnail);
      });
      this.featuredProducts = products;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.showToast = true;
    this.toastMessage = `${product.title} has been added to your cart.`;

    setTimeout(() => this.showToast = false, 3000); // hide after 3s
  }

  goToCategory(category: string) {
    this.router.navigate(['/products'], { queryParams: { category } });
  }
}
