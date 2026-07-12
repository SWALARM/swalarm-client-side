import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTabsModule],
  template: `
    <div class="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div class="flex items-center justify-between">
        <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <mat-tab-group animationDuration="0ms" class="space-y-4">
        <mat-tab label="Overview">
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-4">
            <mat-card>
              <mat-card-header>
                <mat-card-title class="text-sm font-medium">Total Revenue</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="text-2xl font-bold">$45,231.89</div>
                <p class="text-xs text-muted-foreground">+20.1% from last month</p>
              </mat-card-content>
            </mat-card>

            <mat-card>
              <mat-card-header>
                <mat-card-title class="text-sm font-medium">Subscriptions</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="text-2xl font-bold">+2350</div>
                <p class="text-xs text-muted-foreground">+180.1% from last month</p>
              </mat-card-content>
            </mat-card>

            <mat-card>
              <mat-card-header>
                <mat-card-title class="text-sm font-medium">Active Users</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="text-2xl font-bold">+12,234</div>
                <p class="text-xs text-muted-foreground">+19% from last month</p>
              </mat-card-content>
            </mat-card>

            <mat-card>
              <mat-card-header>
                <mat-card-title class="text-sm font-medium">Conversion Rate</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="text-2xl font-bold">24.5%</div>
                <p class="text-xs text-muted-foreground">+4.3% from last month</p>
              </mat-card-content>
            </mat-card>
          </div>

          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7 pt-4">
            <mat-card class="col-span-4">
              <mat-card-header>
                <mat-card-title>Overview</mat-card-title>
                <mat-card-subtitle>Monthly revenue and user growth</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="h-80 w-full rounded-md bg-muted/50"></div>
              </mat-card-content>
            </mat-card>

            <mat-card class="col-span-3">
              <mat-card-header>
                <mat-card-title>Recent Activity</mat-card-title>
                <mat-card-subtitle>Latest user actions and events</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="h-80 w-full rounded-md bg-muted/50"></div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Analytics">
          <div class="pt-4">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Analytics</mat-card-title>
                <mat-card-subtitle>Detailed analytics and metrics</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="h-96 w-full rounded-md bg-muted/50"></div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Reports">
          <div class="pt-4">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Reports</mat-card-title>
                <mat-card-subtitle>Generated reports and summaries</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="h-96 w-full rounded-md bg-muted/50"></div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
})
export class DashboardComponent {}
