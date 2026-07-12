import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { Role } from '../../../core/types';

interface NavItem {
  title: string;
  url: string;
  icon: string;
  isActive?: boolean;
  items?: { title: string; url: string }[];
}

interface Project {
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatListModule, MatExpansionModule],
  template: `
    <div class="sidebar-container h-full flex flex-col border-r bg-background w-64 transition-all duration-300"
         [class.w-16]="collapsed()"
         [class.w-64]="!collapsed()">

      <!-- Header -->
      <div class="p-4 border-b">
        <div class="flex items-center gap-3">
          <div class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg shrink-0">
            <mat-icon class="size-4">business</mat-icon>
          </div>
          @if (!collapsed()) {
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">Acme Inc</span>
              <span class="truncate text-xs">Enterprise</span>
            </div>
          }
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex-1 overflow-y-auto p-2">
        <div class="mb-2">
          @if (!collapsed()) {
            <div class="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Platform</div>
          }
          @for (item of navItems; track item.title) {
            <mat-expansion-panel class="sidebar-nav-panel" [expanded]="item.isActive" hideToggle>
              <mat-expansion-panel-header>
                <mat-panel-title class="flex items-center gap-2">
                  <mat-icon class="size-4">{{ item.icon }}</mat-icon>
                  @if (!collapsed()) {
                    <span>{{ item.title }}</span>
                  }
                </mat-panel-title>
              </mat-expansion-panel-header>
              @for (subItem of item.items; track subItem.title) {
                <a [routerLink]="subItem.url" routerLinkActive="bg-accent text-accent-foreground"
                   class="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer">
                  {{ subItem.title }}
                </a>
              }
            </mat-expansion-panel>
          }
        </div>

        <!-- Projects -->
        @if (!collapsed()) {
          <div class="mb-2">
            <div class="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Projects</div>
            @for (project of projects; track project.name) {
              <a [routerLink]="project.url" routerLinkActive="bg-accent text-accent-foreground"
                 class="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer">
                <mat-icon class="size-4">{{ project.icon }}</mat-icon>
                <span>{{ project.name }}</span>
              </a>
            }
          </div>
        }
      </div>

      <!-- Footer User -->
      <div class="p-3 border-t">
        <div class="flex items-center gap-3">
          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground shrink-0">
            <mat-icon class="h-4 w-4">person</mat-icon>
          </div>
          @if (!collapsed()) {
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">User</span>
              <span class="truncate text-xs">user&#64;example.com</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sidebar-nav-panel {
      box-shadow: none !important;
      background: transparent !important;
    }
    :host ::ng-deep .mat-expansion-panel-header {
      padding: 0 12px !important;
      height: 36px !important;
    }
    :host ::ng-deep .mat-expansion-panel-body {
      padding: 0 0 0 16px !important;
    }
    :host ::ng-deep .mat-expansion-panel {
      background: transparent !important;
    }
  `],
})
export class SidebarComponent {
  userRole = input.required<Role>();
  collapsed = input(false);
  toggleCollapse = output<void>();

  get navItems(): NavItem[] {
    const commonNav: NavItem[] = [
      {
        title: 'Playground',
        url: '/playground',
        icon: 'sports_esports',
        isActive: true,
        items: [
          { title: 'History', url: '/playground/history' },
          { title: 'Starred', url: '/playground/starred' },
        ],
      },
      {
        title: 'Documentation',
        url: '/docs',
        icon: 'menu_book',
        items: [
          { title: 'Introduction', url: '/docs/intro' },
          { title: 'Get Started', url: '/docs/start' },
        ],
      },
    ];

    const adminNav: NavItem[] = [
      {
        title: 'Models',
        url: '/models',
        icon: 'smart_toy',
        items: [
          { title: 'Genesis', url: '/models/genesis' },
          { title: 'Explorer', url: '/models/explorer' },
          { title: 'Quantum', url: '/models/quantum' },
        ],
      },
      {
        title: 'Settings',
        url: '/settings',
        icon: 'settings',
        items: [
          { title: 'General', url: '/settings/general' },
          { title: 'Team', url: '/settings/team' },
          { title: 'Billing', url: '/settings/billing' },
          { title: 'Limits', url: '/settings/limits' },
        ],
      },
    ];

    return this.userRole() === 'admin' ? [...commonNav, ...adminNav] : commonNav;
  }

  get projects(): Project[] {
    const common: Project[] = [
      { name: 'Design Engineering', url: '/projects/design', icon: 'dashboard' },
      { name: 'Sales & Marketing', url: '/projects/sales', icon: 'analytics' },
    ];

    const admin: Project[] = [
      { name: 'Admin Dashboard', url: '/admin/dashboard', icon: 'map' },
    ];

    return this.userRole() === 'admin' ? [...common, ...admin] : common;
  }
}
