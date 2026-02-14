export const PERMISSIONS = {
  authorizationManage: 'authorization.manage',
  dashboardView: 'dashboard.view',
  paymentsView: 'payments.view',
  propertiesView: 'properties.view',
  propertiesWrite: 'properties.write',
  tenantsView: 'tenants.view',
  societyView: 'society.view',
  societyWrite: 'society.write',
  reportsView: 'reports.view',
  settingsView: 'settings.view',
  settingsWrite: 'settings.write',
  marketplaceView: 'marketplace.view',
} as const;

export type PermissionKey = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
