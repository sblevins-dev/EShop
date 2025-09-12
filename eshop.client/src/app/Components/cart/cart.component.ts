import { Component, inject, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../Services/cart.service';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { Product } from '../../Services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;
  tax = 0;
  cartService: CartService = inject(CartService);
  router: Router = inject(Router);
  userService = inject(UserService);

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      this.tax = this.total * 0.07
      this.total += this.tax;
    });
  }

  removeItem(productId: number) {
    const userId = this.userService.getCurrentUserId() ?? undefined;
    this.cartService.removeFromCart(productId, userId);
  }

  updateQuantity(product: Product, quantity: number) {
    this.cartService.updateQuantity(product, quantity);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }
}
