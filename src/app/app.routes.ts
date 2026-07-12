import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page.component').then((m) => m.LoginPageComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/components/landing/landing.component').then((m) => m.LandingComponent),
  },
  {
    path: 'admin',
    loadComponent: () => import('./layout/layout.component').then((m) => m.LayoutComponent),
    canActivate: [authGuard('admin')],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/components/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
    ],
  },
  {
    path: 'user',
    loadComponent: () => import('./layout/layout.component').then((m) => m.LayoutComponent),
    canActivate: [authGuard('user')],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/components/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
