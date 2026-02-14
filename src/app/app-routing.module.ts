import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PERMISSIONS } from './core/constants/permissions';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'register', redirectTo: 'login/register', pathMatch: 'full' },
  {
    path: 'marketplace',
    loadChildren: () =>
      import('./features/marketplace/marketplace.module').then(
        (m) => m.MarketplaceModule,
      ),
    data: { feature: 'enableMarketplace' },
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule,
          ),
        data: { permission: PERMISSIONS.dashboardView },
      },
      {
        path: 'payments',
        loadChildren: () =>
          import('./features/payments/payments.module').then(
            (m) => m.PaymentsModule,
          ),
        data: { permission: PERMISSIONS.paymentsView },
      },
      {
        path: 'properties',
        loadChildren: () =>
          import('./features/properties/properties.module').then(
            (m) => m.PropertiesModule,
          ),
        data: { permission: PERMISSIONS.propertiesView },
      },
      {
        path: 'tenants',
        loadChildren: () =>
          import('./features/tenants/tenants.module').then(
            (m) => m.TenantsModule,
          ),
        data: { permission: PERMISSIONS.tenantsView },
      },
      {
        path: 'society',
        loadChildren: () =>
          import('./features/society/society.module').then(
            (m) => m.SocietyModule,
          ),
        data: {
          permission: PERMISSIONS.societyView,
        },
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./features/reports/reports.module').then(
            (m) => m.ReportsModule,
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.module').then(
            (m) => m.SettingsModule,
          ),
        data: { permission: PERMISSIONS.settingsView },
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: '404',
    loadChildren: () =>
      import('./features/not-found/not-found.module').then(
        (m) => m.NotFoundModule,
      ),
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

