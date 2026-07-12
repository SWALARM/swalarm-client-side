import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { SignupFormComponent } from '../../components/signup-form/signup-form.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, LoginFormComponent, SignupFormComponent],
  template: `
    <div class="grid min-h-svh lg:grid-cols-2">
      <!-- Left Panel -->
      <div class="flex flex-col gap-4 p-6 md:p-10">
        <!-- Logo + Title -->
        <div class="flex justify-center gap-2 md:justify-start">
          <a href="#" class="flex items-center gap-2 font-medium">
            <div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <mat-icon class="size-4">play_arrow</mat-icon>
            </div>
            {{ productName }}
          </a>
        </div>

        <!-- Form -->
        <div class="flex flex-1 items-center justify-center">
          <div class="w-full max-w-xs">
            @if (isLogin) {
              <app-login-form (submitForm)="handleLogin($event)" />
            } @else {
              <app-signup-form (submitForm)="handleSignup($event)" />
            }

            <!-- Toggle Button -->
            <div class="text-center text-sm mt-4">
              {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
              <button type="button" (click)="toggleForm()" class="underline underline-offset-4">
                {{ isLogin ? "Sign up" : "Login" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="relative hidden bg-black lg:block">
        <img src="/placeholder.svg" alt="Image"
             class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>
  `,
})
export class LoginPageComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  productName = 'Enthanu Sugalle?';
  isLogin = true;

  ngOnInit(): void {
    this.authService.fetchMe().subscribe({
      next: (user) => {
        if (user && (user as any).role) {
          this.router.navigate([`/${(user as any).role}/dashboard`]);
        }
      },
    });
  }

  toggleForm(): void {
    this.isLogin = !this.isLogin;
  }

  handleLogin(data: { email: string; password: string }): void {
    this.authService.login(data).subscribe({
      next: (user) => {
        this.router.navigate([`/${user.role}/dashboard`]);
      },
    });
  }

  handleSignup(data: { userName: string; email: string; password: string; confirmPassword: string }): void {
    this.authService.signup(data).subscribe({
      next: (user) => {
        this.router.navigate([`/${user.role}/dashboard`]);
      },
    });
  }
}
