import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import {
  AUTHORIZATION_CONFIG,
  DEFAULT_AUTHORIZATION_CONFIG,
} from './authorization/authorization-config';
import { AuthService } from './services/auth.service';
import { ApiClientService } from './services/api-client.service';
import { AuthorizationService } from './services/authorization.service';
import { FeatureFlagsService } from './services/feature-flags.service';
import { UserSettingsService } from './services/user-settings.service';
import { DashboardDataService } from './services/dashboard-data.service';
import { ThemeService } from './services/theme.service';
import { RentalTrackingService } from './services/rental-tracking.service';
import { SocietyManagementService } from './services/society-management.service';
import { MarketplaceDataService } from './services/marketplace-data.service';
import { PlatformInsightsService } from './services/platform-insights.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    AuthGuard,
    AuthService,
    AuthorizationService,
    { provide: AUTHORIZATION_CONFIG, useValue: DEFAULT_AUTHORIZATION_CONFIG },
    ApiClientService,
    FeatureFlagsService,
    UserSettingsService,
    DashboardDataService,
    ThemeService,
    RentalTrackingService,
    SocietyManagementService,
    MarketplaceDataService,
    PlatformInsightsService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule.');
    }
  }
}
