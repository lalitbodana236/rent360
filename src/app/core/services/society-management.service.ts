import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { UserRole } from './auth.service';

export interface SocietyManagementSummary {
  openComplaints: number;
  slaBreaches: number;
  meetingsThisMonth: number;
  visitorEntriesToday: number;
}

@Injectable()
export class SocietyManagementService {
  constructor(private readonly apiClient: ApiClientService) {}

  getSummary(role: UserRole): Observable<SocietyManagementSummary> {
    const fileKey = this.toFileKey(role);
    return this.apiClient.get<SocietyManagementSummary>({
      endpoint: `society/summary/${fileKey}`,
      mockPath: `society/summary-${fileKey}.json`,
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
