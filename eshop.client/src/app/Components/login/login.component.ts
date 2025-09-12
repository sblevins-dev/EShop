import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  authService: AuthService = inject(AuthService);
  cartService: CartService = inject(CartService);
  router = inject(Router);

  onLogin(form: any) {
    if (form.invalid) {
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: user => {
        const userId = user.userId.toString();
        this.cartService.getCartFromApi(userId).subscribe(backendCart => {
          this.cartService.updateCartAfterLogin(userId, backendCart);
        });
        this.router.navigate(['/']);
      },
      error: err => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login error:', err);
      }
    });

  }
}
