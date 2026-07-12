import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../types';

export const authGuard = (requiredRole: Role): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.user();
    const isAuthenticated = authService.isAuthenticated();

    if (!isAuthenticated || !user) {
      return router.createUrlTree(['/login']);
    }

    if (user.isBlocked) {
      return router.createUrlTree(['/blocked']);
    }

    if (user.role !== requiredRole) {
      return router.createUrlTree([`/${user.role}/dashboard`]);
    }

    return true;
  };
};
