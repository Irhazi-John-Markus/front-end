import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatInputModule, MatCardModule],
  templateUrl: './authentication.html',
  styleUrl: './authentication.css'
})
export class Authentication {
isLoginMode: any;
switchMode() {
throw new Error('Method not implemented.');
}
 loginForm: FormGroup;
  loginData = signal<{ email: string; password: string } | null>(null); 
  
  router = inject(Router);
  
  loginError = signal<string | null>(null);
  loginSuccess = signal<boolean>(false);
  loading = signal<boolean>(false);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['test@example.com', [Validators.required, Validators.email]],
      password: ['password000', [Validators.required, Validators.minLength(6)]] 
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginSuccess.set(false);
      this.loginError.set('Please fill in all required fields correctly.');
      console.error('Form validation failed');
      return;
    }

    const { email, password } = this.loginForm.value;
    this.loginData.set({ email, password });
    this.loginError.set(null);
    this.loginSuccess.set(false);
    this.loading.set(true);

    try {
      if (email === 'test@example.com' && password === 'password000') {
        this.loginSuccess.set(true);
        this.loginError.set(null);
        console.log('Login successful');
        setTimeout(() => this.router.navigate(['/dashboard']), 1200);
      } else {
        this.loginSuccess.set(false);
        this.loginError.set('Invalid email or password.');
        console.error('Login failed');
      }
    } catch (error: any) {
      this.loginSuccess.set(false);
      this.loginError.set('An unexpected error occurred.');
      console.error(error);
    } finally {
      this.loading.set(false);
    }
  }

}