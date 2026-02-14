import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { UserRole } from './auth.service';

export interface MarketplaceSummary {
  activeListings: number;
  monthlyLeads: number;
  conversionRate: number;
  vacancyImpactPercent: number;
}

@Injectable()
export class MarketplaceDataService {
  constructor(private readonly apiClient: ApiClientService) {}

  getSummary(role: UserRole): Observable<MarketplaceSummary> {
    const fileKey = this.toFileKey(role);
    return this.apiClient.get<MarketplaceSummary>({
      endpoint: `marketplace/summary/${fileKey}`,
      mockPath: `marketplace/summary-${fileKey}.json`,
    });
  }

  private toFileKey(role: UserRole): string {
    if (role === 'tenant') {
      return 'tenant';
    }
    if (role === 'societyAdmin') {
      return 'society-admin';
    }
    return 'owner';
  }
}
