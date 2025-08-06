import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './authentication.html',
  styleUrls: ['./authentication.css']
})
export class Authentication {
  isLoginMode = signal(true);

  authForm: FormGroup;
  loginData = signal<{ email: string; password: string } | null>(null);
  router = inject(Router);
  loginError = signal<string | null>(null);
  loginSuccess = signal<boolean>(false);
  loading = signal<boolean>(false);

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    });
  }

  switchMode() {
    this.isLoginMode.update(mode => !mode);
  }

  async onSubmit(): Promise<void> {
    if (this.authForm.invalid) {
      this.loginSuccess.set(false);
      this.loginError.set('Please fill in all required fields correctly.');
      return;
    }

    const { email, password, confirmPassword } = this.authForm.value;

    if (!this.isLoginMode() && password !== confirmPassword) {
      this.loginError.set('Passwords do not match.');
      return;
    }

    this.loginData.set({ email, password });
    this.loginError.set(null);
    this.loginSuccess.set(false);
    this.loading.set(true);

    try {
      if (this.isLoginMode()) {
        // Simulate login
        if (email === 'test@example.com' && password === 'password000') {
          this.loginSuccess.set(true);
          this.loginError.set(null);
          // Instantly redirect to dashboard after login
          this.router.navigate(['/dashboard']);
        } else {
          this.loginError.set('Invalid email or password.');
        }
      } else {
        // Simulate registration
        console.log('Registered:', { email, password });
        this.loginSuccess.set(true);
        this.loginError.set(null);
        // Switch to login mode after registration
        setTimeout(() => {
          this.switchMode();
          // Optionally, clear the form or set focus
        }, 1000);
      }
    } catch (error: any) {
      this.loginError.set('An unexpected error occurred.');
    } finally {
      this.loading.set(false);
    }
  }
}