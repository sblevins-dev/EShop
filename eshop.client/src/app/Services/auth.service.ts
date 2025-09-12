import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7217/api/Auth';
  private tokenKey = 'eshop_token';
  cartService = inject(CartService);

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<{ token: string; userId: number }>(`${this.apiUrl}/login`, { username, password })
      .pipe(tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
        localStorage.setItem('eshop_user', res.userId.toString());
      }));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('eshop_user');
    this.cartService.clearCart();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  register(username: string, password: string) {
    return this.http.post<{ token: string; userId: number }>(`${this.apiUrl}/register`, { username, password })
      .pipe(tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
        localStorage.setItem('eshop_user', res.userId.toString());
      }));
  }
}
