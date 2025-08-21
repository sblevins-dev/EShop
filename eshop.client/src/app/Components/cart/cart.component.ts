import { Component, inject, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;
  cartService: CartService = inject(CartService);

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    });
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }
}
