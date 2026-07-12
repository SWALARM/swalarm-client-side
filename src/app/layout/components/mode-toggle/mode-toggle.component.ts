import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-mode-toggle',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
  template: `
    <button mat-icon-button [matMenuTriggerFor]="themeMenu">
      <mat-icon>{{ isDark() ? 'dark_mode' : 'light_mode' }}</mat-icon>
    </button>
    <mat-menu #themeMenu="matMenu">
      <button mat-menu-item (click)="setTheme('light')">
        <mat-icon>brightness_high</mat-icon>
        <span>Light</span>
      </button>
      <button mat-menu-item (click)="setTheme('dark')">
        <mat-icon>brightness_low</mat-icon>
        <span>Dark</span>
      </button>
      <button mat-menu-item (click)="setTheme('system')">
        <mat-icon>brightness_auto</mat-icon>
        <span>System</span>
      </button>
    </mat-menu>
  `,
})
export class ModeToggleComponent {
  private themeService = inject(ThemeService);
  isDark = this.themeService.theme;

  setTheme(theme: 'light' | 'dark' | 'system'): void {
    this.themeService.setTheme(theme);
  }
}
