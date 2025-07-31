import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  loginData = signal<{ email: string; password: string } | null>(null); 
  
  router = inject(Router);
  
  loginError = signal<string | null>(null);
  loginSuccess = signal<boolean>(false);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['test@example.com', [Validators.required, Validators.email]],
      password: ['password000', [Validators.required, Validators.minLength(6)]] 
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginData.set({ email, password });
      console.log(`Attempting login with email: ${email} and password: ${password}`);

      email === 'test@example.com' && password === 'password000'
        ? (this.loginSuccess.set(true),
           this.loginError.set(null),
           console.log('Login successful'),
           alert('Login successful!'), 
           setTimeout(() => this.router.navigate(['/dashboard']), 2000))
        : (this.loginSuccess.set(false),
           this.loginError.set('Invalid email or password.'),
           console.error('Login failed'));
    } else {
      this.loginSuccess.set(false);
      this.loginError.set('Please fill in all required fields correctly.');
      console.error('Form validation failed');
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']); 
  }
}
