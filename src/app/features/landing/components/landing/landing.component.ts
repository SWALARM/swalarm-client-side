import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-8 space-y-6">
      <h1 class="text-4xl font-bold">Angular + Material + Tailwind</h1>
      <p class="text-lg">
        Tailwind test: <span class="text-blue-500">blue text</span>
      </p>
      <button mat-flat-button color="primary" (click)="increment()">
        Material Button: Count is {{ count() }}
      </button>
      <button mat-stroked-button color="secondary" (click)="showToast()">
        Secondary Button
      </button>
    </div>
  `,
})
export class LandingComponent {
  count = signal(0);
  private toast = inject(ToastService);

  increment(): void {
    this.count.update((c) => c + 1);
  }

  showToast(): void {
    this.toast.showSuccess('Success!');
  }
}
