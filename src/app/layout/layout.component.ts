import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-header
        [user]="authService.user()"
        (toggleSidebar)="sidebarCollapsed.set(!sidebarCollapsed())"
      />
      <div class="flex flex-1">
        @if (authService.user(); as user) {
          <app-sidebar
            [userRole]="user.role"
            [collapsed]="sidebarCollapsed()"
            (toggleCollapse)="sidebarCollapsed.set(!sidebarCollapsed())"
          />
        }
        <main class="flex-1 flex flex-col">
          <router-outlet />
          <app-footer />
        </main>
      </div>
    </div>
  `,
})
export class LayoutComponent implements OnInit {
  authService = inject(AuthService);
  private router = inject(Router);
  sidebarCollapsed = signal(false);

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (window.innerWidth < 768) {
          this.sidebarCollapsed.set(true);
        }
      });
  }
}
