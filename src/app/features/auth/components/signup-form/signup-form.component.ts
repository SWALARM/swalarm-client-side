import { Component, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  emailValidator,
  passwordMinValidator,
  passwordMaxValidator,
  confirmPasswordValidator,
} from '../../../../shared/validators';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <form [formGroup]="signupForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-6">
      <div class="text-center">
        <h1 class="text-2xl font-bold">Create a new account</h1>
        <p class="text-muted-foreground text-sm">Enter your details below to sign up</p>
      </div>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Name</mat-label>
        <input matInput placeholder="Your full user-name" formControlName="userName" />
        @if (signupForm.get('userName')?.hasError('minlength') && signupForm.get('userName')?.touched) {
          <mat-error>Username must be at least 2 characters</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Email</mat-label>
        <input matInput placeholder="m&#64;example.com" formControlName="email" type="email" />
        @if (signupForm.get('email')?.hasError('emailInvalid') && signupForm.get('email')?.touched) {
          <mat-error>{{ signupForm.get('email')?.errors?.['emailInvalid'] }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password" />
        @if (signupForm.get('password')?.hasError('passwordMin') && signupForm.get('password')?.touched) {
          <mat-error>{{ signupForm.get('password')?.errors?.['passwordMin'] }}</mat-error>
        }
        @if (signupForm.get('password')?.hasError('passwordMax') && signupForm.get('password')?.touched) {
          <mat-error>{{ signupForm.get('password')?.errors?.['passwordMax'] }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Confirm Password</mat-label>
        <input matInput type="password" formControlName="confirmPassword" />
        @if (signupForm.get('confirmPassword')?.hasError('confirmPasswordMismatch') && signupForm.get('confirmPassword')?.touched) {
          <mat-error>{{ signupForm.get('confirmPassword')?.errors?.['confirmPasswordMismatch'] }}</mat-error>
        }
      </mat-form-field>

      <button mat-flat-button color="primary" type="submit" class="w-full" [disabled]="signupForm.invalid">
        Sign up
      </button>
    </form>
  `,
})
export class SignupFormComponent {
  private fb = inject(FormBuilder);
  submitForm = output<{ userName: string; email: string; password: string; confirmPassword: string }>();

  signupForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, emailValidator()]],
    password: ['', [Validators.required, passwordMinValidator(), passwordMaxValidator()]],
    confirmPassword: ['', [Validators.required, passwordMinValidator(), passwordMaxValidator(), confirmPasswordValidator()]],
  });

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.submitForm.emit(this.signupForm.value);
    }
  }
}
