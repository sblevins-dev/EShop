import { Injectable } from '@angular/core';
import { Product } from './product.service';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'eshop_cart';
  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const cart = localStorage.getItem(this.storageKey);
    if (cart) {
      this.items = JSON.parse(cart);
      this.cartSubject.next(this.items);
    }
  }

  private saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  addToCart(product: Product, quantity: number = 1) {
    const item = this.items.find(i => i.product.id === product.id);

    if (item) {
      item.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }

    this.saveCart();
    this.cartSubject.next(this.items);
  }

  removeFromCart(productId: number) {
    this.items = this.items.filter(i => i.product.id !== productId);
    this.cartSubject.next(this.items);
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.items.find(i => i.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCart();
        this.cartSubject.next(this.items);
      }
    }
  }

  clearCart() {
    this.items = [];
    this.cartSubject.next(this.items);
  }

  getItems(): CartItem[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
