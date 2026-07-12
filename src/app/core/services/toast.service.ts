import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private snackBar = inject(MatSnackBar);

  showSuccess(message = 'Success!'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['toast-success'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  showError(message = 'Something went wrong!'): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: ['toast-error'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  showInfo(message = 'Info'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['toast-info'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
