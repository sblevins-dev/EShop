import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = ''
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  onRegister(form: any) {
    this.errorMessage = '';
    this.successMessage = '';


    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match.";
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = "Password must be at least 6 characters long.";
      return;
    }

    // Simulate a successful registration
    this.successMessage = "Registration successful!";

    if (form.invalid) {
      return;
    } else {
      this.authService.register(this.email, this.password).subscribe({
        next: () => {
          this.successMessage = "Registration successful!";
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        }
      });
    }


  }
}
