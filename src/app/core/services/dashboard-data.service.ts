import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRole } from './auth.service';
import { ApiClientService } from './api-client.service';

export type DashboardPersona = 'owner' | 'tenant' | 'societyAdmin';

export interface DashboardOverview {
  role: DashboardPersona;
  kpis: { label: string; value: string }[];
  collectionHealth: {
    label: string;
    percent: number;
    tone: 'success' | 'info' | 'warning' | 'danger';
  }[];
  charges: {
    amount: string;
    property: string;
    unit: string;
    description: string;
    status: 'Paid' | 'Late' | 'Due';
    action: string;
  }[];
}

@Injectable()
export class DashboardDataService {
  constructor(private readonly apiClient: ApiClientService) {}

  getOverviewByRole(role: UserRole): Observable<DashboardOverview> {
    const persona = this.toPersona(role);
    const fileKey = this.personaToFileKey(persona);

    return this.apiClient
      .get<DashboardOverview>({
        endpoint: `dashboard/overview/${fileKey}`,
        mockPath: `dashboard/overview-${fileKey}.json`,
      })
      .pipe(map((data) => ({ ...data, role: persona })));
  }

  private toPersona(role: UserRole): DashboardPersona {
    if (role === 'tenant') {
      return 'tenant';
    }
    if (role === 'societyAdmin') {
      return 'societyAdmin';
    }
    return 'owner';
  }

  private personaToFileKey(persona: DashboardPersona): string {
    if (persona === 'societyAdmin') {
      return 'society-admin';
    }
    return persona;
  }
}
