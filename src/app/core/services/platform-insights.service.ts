import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRole } from './auth.service';
import { MarketplaceDataService } from './marketplace-data.service';
import { RentalTrackingService } from './rental-tracking.service';
import { SocietyManagementService } from './society-management.service';

export interface PlatformInsight {
  title: string;
  value: string;
  description: string;
}

@Injectable()
export class PlatformInsightsService {
  constructor(
    private readonly rentalService: RentalTrackingService,
    private readonly societyService: SocietyManagementService,
    private readonly marketplaceService: MarketplaceDataService,
  ) {}

  getInsights(role: UserRole): Observable<PlatformInsight[]> {
    return forkJoin({
      rental: this.rentalService.getSummary(role),
      society: this.societyService.getSummary(role),
      marketplace: this.marketplaceService.getSummary(role),
    }).pipe(
      map(({ rental, society, marketplace }) => [
        {
          title: 'Rental Health',
          value: `${rental.onTimeCollection}% on-time`,
          description: `${rental.overdueTenants} tenants overdue across ${rental.overdueUnits} units`,
        },
        {
          title: 'Society Ops',
          value: `${society.openComplaints} open complaints`,
          description: `${society.slaBreaches} SLA risks, ${society.meetingsThisMonth} meetings this month`,
        },
        {
          title: 'Marketplace Impact',
          value: `${marketplace.monthlyLeads} leads / month`,
          description: `${marketplace.conversionRate}% conversion, vacancy impact ${marketplace.vacancyImpactPercent}%`,
        },
      ]),
    );
  }
}
