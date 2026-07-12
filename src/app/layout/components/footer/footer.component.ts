import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <footer class="border-t py-6 md:py-0">
      <div class="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4">
        <p class="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with <mat-icon class="inline-block h-4 w-4 text-red-500 align-middle">favorite</mat-icon> by
          <a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer"
             class="font-medium underline underline-offset-4">Your Name</a>.
          The source code is available on
          <a href="https://github.com/yourusername/your-repo" target="_blank" rel="noreferrer"
             class="font-medium underline underline-offset-4">GitHub</a>.
        </p>
        <div class="flex items-center gap-2">
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
            <button mat-icon-button>
              <mat-icon>code</mat-icon>
            </button>
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer">
            <button mat-icon-button>
              <mat-icon>share</mat-icon>
            </button>
          </a>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
