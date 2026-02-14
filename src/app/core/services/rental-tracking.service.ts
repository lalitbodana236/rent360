import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { UserRole } from './auth.service';

export interface RentalTrackingSummary {
  occupancyRate: number;
  onTimeCollection: number;
  overdueUnits: number;
  overdueTenants: number;
}

@Injectable()
export class RentalTrackingService {
  constructor(private readonly apiClient: ApiClientService) {}

  getSummary(role: UserRole): Observable<RentalTrackingSummary> {
    const fileKey = this.toFileKey(role);
    return this.apiClient.get<RentalTrackingSummary>({
      endpoint: `rental/summary/${fileKey}`,
      mockPath: `rental/summary-${fileKey}.json`,
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
