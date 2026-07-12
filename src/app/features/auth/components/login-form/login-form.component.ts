import { Component, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { emailValidator, passwordMinValidator, passwordMaxValidator } from '../../../../shared/validators';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-6">
      <div class="text-center">
        <h1 class="text-2xl font-bold">Login to your account</h1>
        <p class="text-muted-foreground text-sm">Enter your email below to login to your account</p>
      </div>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Email</mat-label>
        <input matInput placeholder="m&#64;example.com" formControlName="email" type="email" />
        @if (loginForm.get('email')?.hasError('emailInvalid') && loginForm.get('email')?.touched) {
          <mat-error>{{ loginForm.get('email')?.errors?.['emailInvalid'] }}</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password" />
        @if (loginForm.get('password')?.hasError('passwordMin') && loginForm.get('password')?.touched) {
          <mat-error>{{ loginForm.get('password')?.errors?.['passwordMin'] }}</mat-error>
        }
        @if (loginForm.get('password')?.hasError('passwordMax') && loginForm.get('password')?.touched) {
          <mat-error>{{ loginForm.get('password')?.errors?.['passwordMax'] }}</mat-error>
        }
      </mat-form-field>

      <button mat-flat-button color="primary" type="submit" class="w-full" [disabled]="loginForm.invalid">
        Login
      </button>
    </form>
  `,
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  submitForm = output<{ email: string; password: string }>();

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, emailValidator()]],
    password: ['', [Validators.required, passwordMinValidator(), passwordMaxValidator()]],
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitForm.emit(this.loginForm.value);
    }
  }
}
