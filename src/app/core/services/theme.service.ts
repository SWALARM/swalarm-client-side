import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private storageKey = 'vite-ui-theme';

  theme = signal<Theme>((isPlatformBrowser(this.platformId) ? (localStorage.getItem(this.storageKey) as Theme) : null) || 'system');

  constructor() {
    effect(() => {
      const currentTheme = this.theme();
      if (!isPlatformBrowser(this.platformId)) return;

      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');

      if (currentTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(currentTheme);
      }

      localStorage.setItem(this.storageKey, currentTheme);
    });
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }
}
