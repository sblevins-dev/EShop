import { Injectable } from '@angular/core';
import { Product } from './product.service';
import { BehaviorSubject, tap } from 'rxjs';
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

  // ----- Local Storage -----
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

  getItems(): CartItem[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  // ----- Cart operations -----
  addToCart(product: Product, quantity: number = 1, userId?: string) {
    const item = this.items.find(i => i.product.id === product.id);
    if (item) {
      item.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }

    this.saveCart();
    this.cartSubject.next(this.items);

    if (userId) this.syncItemToBackend(userId, product, quantity);
  }

  removeFromCart(productId: number, userId?: string) {
    this.items = this.items.filter(i => i.product.id !== productId);
    this.saveCart();
    this.cartSubject.next(this.items);

    if (userId) this.http.delete(`${this.apiUrl}/${userId}/remove/${productId}`).subscribe();
  }

  updateQuantity(product: Product, quantity: number, userId?: string) {
    const item = this.items.find(i => i.product.id === product.id);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(product.id, userId);
      } else {
        this.saveCart();
        this.cartSubject.next(this.items);
        if (userId) this.syncItemToBackend(userId, product, quantity);
      }
    }
  }

  clearCart(userId?: string) {
    this.items = [];
    this.cartSubject.next(this.items);
    localStorage.removeItem(this.storageKey);

    if (userId) this.http.delete(`${this.apiUrl}/${userId}/clear`).subscribe();
  }

  // ----- Backend syncing -----
  private syncItemToBackend(userId: string, product: Product, quantity: number) {
    const dto = { userId, product, quantity };
    this.http.post(`${this.apiUrl}/${userId}/add`, dto).subscribe();
  }

  getCartFromApi(userId: string) {
    return this.http.get<CartItem[]>(`${this.apiUrl}/${userId}`);
  }

  saveCartToApi(userId: string) {
    return this.http.post(`${this.apiUrl}/${userId}`, this.items);
  }

  // ----- Merge local + backend cart -----
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

  updateCartAfterLogin(userId: string, backendCart: CartItem[]) {
    const localCart = this.getItems();
    const mergedCart = this.mergeCarts(localCart, backendCart);

    this.items = mergedCart;
    this.saveCart();
    this.cartSubject.next(this.items);

    // Sync merged cart back to backend
    this.saveCartToApi(userId).subscribe();
  }
}
