import { Injectable } from '@angular/core';
import { Product } from './product.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:7217/api/Cart';
  private storageKey = 'eshop_cart';
  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  getCartFromApi(userId: string) {
    return this.http.get<CartItem[]>(`${this.apiUrl}/${userId}`);
  }

  saveCartToApi(userId: string) {
    return this.http.post(`${this.apiUrl}/${userId}`, this.items);
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

  mergeCarts(local: CartItem[], backend: CartItem[]): CartItem[] {
    const merged: CartItem[] = [...backend];

    local.forEach(localItem => {
      const existing = merged.find(b => b.product.id === localItem.product.id);
      if (existing) {
        existing.quantity += localItem.quantity;
      } else {
        merged.push(localItem);
      }
    });

    return merged;
  }

  updateCartAfterLogin(backendCart: CartItem[]) {
    const localCart = this.getItems();
    const mergedCart = this.mergeCarts(localCart, backendCart);
    this.items = mergedCart;
    this.saveCart();
    this.cartSubject.next(this.items);
  }
}
