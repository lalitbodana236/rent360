import { Component, OnInit } from '@angular/core';
import {
  DashboardDataService,
  DashboardOverview,
  DashboardPersona,
} from '../../core/services/dashboard-data.service';
import { AuthService, UserRole } from '../../core/services/auth.service';
import { UserSettingsService } from '../../core/services/user-settings.service';
import { PlatformInsight, PlatformInsightsService } from '../../core/services/platform-insights.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data: DashboardOverview | null = null;
  insights: PlatformInsight[] = [];
  userName = 'User';

  availablePersonas: DashboardPersona[] = [];
  selectedPersona: DashboardPersona = 'owner';

  constructor(
    private readonly dashboardData: DashboardDataService,
    private readonly settings: UserSettingsService,
    private readonly auth: AuthService,
    private readonly platformInsights: PlatformInsightsService,
  ) {}

  ngOnInit(): void {
    this.settings.userSettings$.subscribe((user) => {
      this.userName = user.fullName;
    });

    this.initializePersonas();
    this.loadPersona(this.selectedPersona);
  }

  get viewLabel(): string {
    if (this.selectedPersona === 'tenant') {
      return 'Tenant View';
    }
    if (this.selectedPersona === 'societyAdmin') {
      return 'Society Admin View';
    }
    return 'Owner View';
  }

  get chargesTitle(): string {
    if (this.selectedPersona === 'tenant') {
      return 'Your Charges';
    }
    if (this.selectedPersona === 'societyAdmin') {
      return 'Society Billing';
    }
    return 'Owner Charges';
  }

  personaLabel(persona: DashboardPersona): string {
    if (persona === 'tenant') {
      return 'Tenant';
    }
    if (persona === 'societyAdmin') {
      return 'Society Admin';
    }
    return 'Owner';
  }

  selectPersona(persona: DashboardPersona): void {
    if (this.selectedPersona === persona) {
      return;
    }
    this.selectedPersona = persona;
    this.loadPersona(persona);
  }

  widthClass(percent: number): string {
    if (percent >= 90) return 'w-[90%]';
    if (percent >= 80) return 'w-[80%]';
    if (percent >= 70) return 'w-[70%]';
    if (percent >= 60) return 'w-[60%]';
    if (percent >= 50) return 'w-[50%]';
    if (percent >= 40) return 'w-[40%]';
    if (percent >= 30) return 'w-[30%]';
    if (percent >= 20) return 'w-[20%]';
    if (percent >= 10) return 'w-[10%]';
    return 'w-[5%]';
  }

  private initializePersonas(): void {
    const roles = this.auth.snapshotUser?.roles ?? [];
    const personas: DashboardPersona[] = [];

    if (roles.includes('owner')) {
      personas.push('owner');
    }
    if (roles.includes('tenant')) {
      personas.push('tenant');
    }
    if (roles.includes('societyAdmin')) {
      personas.push('societyAdmin');
    }

    this.availablePersonas = personas.length ? personas : ['owner'];

    const preferred = this.settings.snapshot.defaultDashboard;
    if (preferred === 'tenant' && this.availablePersonas.includes('tenant')) {
      this.selectedPersona = 'tenant';
    } else {
      this.selectedPersona = this.availablePersonas[0];
    }
  }

  private loadPersona(persona: DashboardPersona): void {
    const asUserRole = persona as UserRole;

    this.dashboardData.getOverviewByRole(asUserRole).subscribe((res) => {
      this.data = res;
    });

    this.platformInsights.getInsights(asUserRole).subscribe((items) => {
      this.insights = items;
    });
  }
}
