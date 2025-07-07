import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
    registerForm: FormGroup;
  authService = inject(AuthService);
  router: any;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['test@example.com', [Validators.required, Validators.email]],
      password: ['password000', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    this.registerForm.valid 
      ? console.log('Form Submitted', this.registerForm.value) 
      : console.log('Form is invalid');
  }
}
