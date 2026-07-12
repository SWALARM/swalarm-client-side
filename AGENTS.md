# AGENTS.md — Frontend (Angular 20 + Material + Tailwind)

## Overview
Angular 20 standalone component SPA with Angular Material, Tailwind CSS v4, signal-based state,
and cookie-based JWT authentication. Part of a monorepo with `backend/` (NestJS).

## Tech Stack
- **Framework:** Angular 20 (standalone components, no NgModules)
- **UI Library:** Angular Material 20 + Tailwind CSS v4
- **State:** Angular signals (reactive primitives)
- **Forms:** Angular Reactive Forms with custom validators
- **HTTP:** Angular HttpClient with interceptors
- **Routing:** Angular Router with lazy-loaded routes
- **Build:** Angular CLI 20 + @angular/build
- **Language:** TypeScript 5.9, strict mode

## Project Structure
```
src/app/
├── app.component.ts              # Root: calls fetchMe() on init, renders router-outlet
├── app.config.ts                 # ApplicationConfig: router, HttpClient, animations
├── app.routes.ts                 # Route definitions with lazy loading
├── core/
│   ├── guards/auth.guard.ts      # Role-based guard (checks isAuthenticated, isBlocked, role)
│   ├── interceptors/auth.interceptor.ts  # HTTP interceptor (placeholder)
│   ├── services/
│   │   ├── auth.service.ts       # Signal-based: login, signup, logout, fetchMe
│   │   ├── theme.service.ts      # Dark/light/system theme with localStorage
│   │   └── toast.service.ts      # MatSnackBar wrapper
│   └── types/user.interface.ts   # IUser { id, email, userName, role, isBlocked? }
├── shared/
│   ├── constants/
│   │   ├── api.constants.ts      # API endpoint paths
│   │   └── auth.constants.ts     # Validation messages
│   ├── lib/utils.ts              # cn() classname utility
│   └── validators/auth.validators.ts  # email, passwordMin, passwordMax, confirmPassword
├── layout/
│   ├── layout.component.ts       # Authenticated layout: header + sidebar + outlet + footer
│   └── components/
│       ├── header/               # Top bar: sidebar toggle, breadcrumbs, notifications, user menu
│       ├── sidebar/              # Collapsible sidebar: nav items, projects, role-based
│       ├── footer/               # Attribution footer
│       ├── mode-toggle/          # Theme switcher dropdown
│       └── nav-user/             # User dropdown: profile, settings, admin, logout
└── features/
    ├── auth/
    │   ├── pages/login-page/     # Login/Signup page with form toggle
    │   └── components/
    │       ├── login-form/       # Reactive form: email + password
    │       └── signup-form/      # Reactive form: userName + email + password + confirmPassword
    ├── dashboard/
    │   └── components/dashboard/ # Tab group: Overview (stats cards), Analytics, Reports
    └── landing/
        └── components/landing/   # Landing page with demo buttons
```

## Routing
| Path              | Component          | Guard              | Lazy |
|-------------------|--------------------|--------------------|------|
| `/`               | LandingComponent   | None               | Yes  |
| `/login`          | LoginPageComponent | None               | Yes  |
| `/admin`          | LayoutComponent    | authGuard('admin') | Yes  |
| `/admin/dashboard`| DashboardComponent | authGuard('admin') | Yes  |
| `/user`           | LayoutComponent    | authGuard('user')  | Yes  |
| `/user/dashboard` | DashboardComponent | authGuard('user')  | Yes  |
| `**`              | Redirects to `/`   | —                  | —    |

## Environment Variables
| Variable           | Dev Default                     | Description                    |
|--------------------|---------------------------------|--------------------------------|
| `apiBaseUrl`       | `http://localhost:3000/api`     | Backend API base URL           |

Configured in `src/environments/environment.ts` (dev) and `environment.prod.ts` (prod).

## Commands
```bash
# Development
ng serve                 # Dev server at http://localhost:4200
npm start                # Same as ng serve

# Build
ng build                 # Production build -> dist/frontend/
ng build --configuration development  # Dev build with source maps

# Quality
ng test                  # Unit tests (Karma + Jasmine)
```

## Coding Conventions
- **Components:** Standalone (`standalone: true`), inline templates preferred, SCSS styles
- **State:** Use Angular signals (`signal()`, `computed()`) — NOT RxJS BehaviorSubject for UI state
- **Forms:** Reactive Forms (`FormBuilder`, `FormGroup`) with custom validators
- **Imports:** Use `@if`, `@for`, `@switch` control flow (NOT `*ngIf`, `*ngFor` structural directives)
- **Lazy loading:** All feature routes use `loadComponent` with dynamic imports
- **File naming:**
  - Components: `kebab-case.component.ts` (e.g., `login-form.component.ts`)
  - Services: `kebab-case.service.ts`
  - Guards: `kebab-case.guard.ts`
  - Directories: `kebab-case/` (e.g., `login-page/`)
- **No NgModules** — everything is standalone
- **Type imports:** Use `import type` for type-only imports
- **Relative imports** from same module, no path aliases configured
- **Tailwind CSS v4** — configured via PostCSS (`@tailwindcss/postcss`), no `tailwind.config.js`
- **Angular Material** — use Material components (MatButton, MatCard, MatMenu, etc.) over custom HTML
- **2-space indentation**, single quotes, 100 char line width (Prettier)

## Key Patterns
- **Signal-based auth:** `AuthService.user` is a `signal<IUser | null>`, read via `authService.user()`
- **Theme:** `ThemeService.theme` signal toggles `dark`/`light` class on `<html>`, persisted to localStorage
- **Toast notifications:** `ToastService` wraps `MatSnackBar` with success/error/info methods
- **Route guards:** `authGuard(role)` returns a `CanActivateFn` checking authentication, role, and blocked status
- **Layout:** `LayoutComponent` wraps authenticated routes with sidebar + header + footer
- **API calls:** Backend endpoints at `{apiBaseUrl}/auth/login`, `/auth/signup`, `/auth/me`, `/auth/logout`
- **Credentials:** All HTTP requests use `withCredentials: true` for cookie transport
