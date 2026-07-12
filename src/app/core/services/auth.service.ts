import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../types';
import { apiEndpoints } from '../../shared/constants';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSignal = signal<IUser | null>(null);
  private isAuthenticatedSignal = signal(false);

  user = this.userSignal.asReadonly();
  isAuthenticated = this.isAuthenticatedSignal.asReadonly();

  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastService,
  ) {}

  login(data: { email: string; password: string }): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseUrl}${apiEndpoints.LOGIN}`, data, { withCredentials: true }).pipe(
      tap((user) => {
        this.userSignal.set(user);
        this.isAuthenticatedSignal.set(true);
        this.toast.showSuccess('Logged in successfully!');
      }),
      catchError((error) => {
        this.toast.showError(error.error?.error || 'Login failed. Please check your credentials.');
        throw error;
      }),
    );
  }

  signup(data: { userName: string; email: string; password: string; confirmPassword: string }): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseUrl}${apiEndpoints.SIGNUP}`, data, { withCredentials: true }).pipe(
      tap((user) => {
        this.userSignal.set(user);
        this.isAuthenticatedSignal.set(true);
        this.toast.showSuccess('Account created successfully!');
      }),
      catchError((error) => {
        this.toast.showError(error.error?.error || 'Signup failed. Please try again.');
        throw error;
      }),
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${apiEndpoints.LOGOUT}`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.userSignal.set(null);
        this.isAuthenticatedSignal.set(false);
        this.router.navigate(['/login']);
        this.toast.showSuccess('Logged out successfully!');
      }),
      catchError((error) => {
        this.toast.showError(error.error?.error || 'Logout failed. Please try again.');
        throw error;
      }),
    );
  }

  fetchMe(): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}${apiEndpoints.FETCH_ME}`, { withCredentials: true }).pipe(
      tap((user) => {
        this.userSignal.set(user);
        this.isAuthenticatedSignal.set(true);
      }),
      catchError((error) => {
        this.userSignal.set(null);
        this.isAuthenticatedSignal.set(false);
        return of(error);
      }),
    );
  }

  getUserRole(): Observable<IUser | null> {
    return new Observable((observer) => {
      const user = this.userSignal();
      if (user) {
        observer.next(user);
      } else {
        this.fetchMe().subscribe({
          next: () => observer.next(this.userSignal()),
          error: () => observer.next(null),
        });
      }
      observer.complete();
    });
  }
}
