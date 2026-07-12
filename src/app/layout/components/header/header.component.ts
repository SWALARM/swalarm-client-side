import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ModeToggleComponent } from '../mode-toggle/mode-toggle.component';
import { NavUserComponent } from '../nav-user/nav-user.component';
import { IUser } from '../../../core/types';

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatToolbarModule,
    ModeToggleComponent,
    NavUserComponent,
  ],
  template: `
    <header class="flex h-16 shrink-0 items-center justify-between px-4 border-b transition-[width,height] ease-linear">
      <!-- Left -->
      <div class="flex items-center gap-4">
        <button mat-icon-button (click)="toggleSidebar.emit()">
          <mat-icon>menu</mat-icon>
        </button>
        <mat-divider [vertical]="true" class="h-6"></mat-divider>
        <nav class="flex items-center gap-1 text-sm text-muted-foreground">
          <a routerLink="/" class="hover:text-foreground">Home</a>
          <mat-icon class="text-xs">chevron_right</mat-icon>
          <span class="text-foreground">Dashboard</span>
        </nav>
      </div>

      <!-- Right -->
      <div class="flex items-center gap-2">
        <!-- Notifications -->
        <button mat-icon-button [matMenuTriggerFor]="notifMenu" class="relative">
          <mat-icon [matBadge]="unreadCount() > 0 ? unreadCount() : null"
                    matBadgeColor="warn" matBadgeSize="small">
            notifications
          </mat-icon>
        </button>
        <mat-menu #notifMenu="matMenu" class="w-80">
          <div class="px-3 py-2 flex items-center justify-between">
            <span class="font-medium text-sm">Notifications</span>
            @if (unreadCount() > 0) {
              <button mat-button class="text-xs" (click)="markAllAsRead()">Mark all as read</button>
            }
          </div>
          <mat-divider></mat-divider>
          @for (notif of notifications(); track notif.id) {
            <button mat-menu-item (click)="markAsRead(notif.id)"
                    [class]="!notif.read ? 'bg-accent/50' : ''">
              <div class="flex flex-col gap-1">
                <span class="text-sm">{{ notif.message }}</span>
                <span class="text-xs text-muted-foreground">{{ notif.read ? 'Read' : 'Unread' }}</span>
              </div>
            </button>
          }
          @if (notifications().length === 0) {
            <div class="p-4 text-center text-sm text-muted-foreground">No notifications</div>
          }
        </mat-menu>

        <app-mode-toggle />

        <app-nav-user
          [userName]="user()?.userName || ''"
          [userEmail]="user()?.email || ''"
          [userRole]="user()?.role || 'user'"
        />
      </div>
    </header>
  `,
})
export class HeaderComponent {
  user = input<IUser | null>(null);
  toggleSidebar = output<void>();

  notifications = signal<Notification[]>([
    { id: 1, message: 'New message received', read: false },
    { id: 2, message: 'Your account was updated', read: false },
    { id: 3, message: 'Welcome to the platform!', read: true },
  ]);

  unreadCount = signal(2);

  markAsRead(id: number): void {
    this.notifications.update((notifs) =>
      notifs.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    this.unreadCount.set(this.notifications().filter((n) => !n.read).length);
  }

  markAllAsRead(): void {
    this.notifications.update((notifs) => notifs.map((n) => ({ ...n, read: true })));
    this.unreadCount.set(0);
  }
}
