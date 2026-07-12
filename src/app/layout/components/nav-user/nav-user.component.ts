import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule, MatDividerModule],
  template: `
    <button mat-button [matMenuTriggerFor]="userMenu" class="flex items-center gap-2">
      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <mat-icon class="h-4 w-4">person</mat-icon>
      </div>
      <div class="grid flex-1 text-left text-sm leading-tight hidden sm:grid">
        <span class="truncate font-medium">{{ userName() }}</span>
        <span class="truncate text-xs text-muted-foreground">{{ userEmail() }}</span>
      </div>
    </button>
    <mat-menu #userMenu="matMenu" class="w-56">
      <div class="px-3 py-2">
        <div class="text-sm font-medium">{{ userName() }}</div>
        <div class="text-xs text-muted-foreground">{{ userEmail() }}</div>
      </div>
      <mat-divider></mat-divider>
      <button mat-menu-item>
        <mat-icon>person</mat-icon>
        <span>Profile</span>
      </button>
      <button mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>Settings</span>
      </button>
      @if (isAdmin()) {
        <button mat-menu-item routerLink="/admin">
          <mat-icon>admin_panel_settings</mat-icon>
          <span>Admin Dashboard</span>
        </button>
      }
      <mat-divider></mat-divider>
      <button mat-menu-item (click)="logout()">
        <mat-icon>logout</mat-icon>
        <span>Log out</span>
      </button>
    </mat-menu>
  `,
})
export class NavUserComponent {
  private authService = inject(AuthService);
  userName = input('');
  userEmail = input('');
  userRole = input<'admin' | 'user'>('user');
  isAdmin = () => this.userRole() === 'admin';

  logout(): void {
    this.authService.logout().subscribe();
  }
}
