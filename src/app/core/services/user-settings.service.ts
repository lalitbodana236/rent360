import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiClientService } from './api-client.service';

export interface UserSettings {
  fullName: string;
  email: string;
  mobileNumber: string;
  address: string;
  currency: 'USD' | 'INR' | 'EUR' | 'GBP' | 'AED';
  defaultDashboard: 'owner' | 'tenant';
  timeFormat: '12h' | '24h';
  timeZone: string;
  language: 'en' | 'hi';
  notifyEmail: boolean;
  notifyWhatsApp: boolean;
  notifyInApp: boolean;
  whatsAppNumber: string;
}

type SettingsRecord = Partial<UserSettings> & Pick<UserSettings, 'email'>;

interface UserSettingsResponse {
  preferences: SettingsRecord[];
}

const DEFAULT_SETTINGS: UserSettings = {
  fullName: 'Olivia Owner',
  email: 'owner@rent360.com',
  mobileNumber: '+1 555-1234',
  address: '10 Main Street',
  currency: 'USD',
  defaultDashboard: 'owner',
  timeFormat: '12h',
  timeZone: 'America/New_York',
  language: 'en',
  notifyEmail: true,
  notifyWhatsApp: false,
  notifyInApp: true,
  whatsAppNumber: '+1 555-1234',
};
const USER_SETTINGS_STORE_KEY = 'r360_user_settings';

@Injectable()
export class UserSettingsService {
  private readonly subject = new BehaviorSubject<UserSettings>(this.readStoredSettings());
  readonly userSettings$ = this.subject.asObservable();

  constructor(private readonly apiClient: ApiClientService) {}

  get snapshot(): UserSettings {
    return this.subject.value;
  }

  loadForUser(email: string): Observable<UserSettings> {
    return this.apiClient
      .get<UserSettingsResponse>({
        endpoint: 'users/preferences',
        mockPath: 'preferences/user-preferences.json',
      })
      .pipe(
        map((res) =>
          ({
            ...DEFAULT_SETTINGS,
            ...(res.preferences.find((entry) => entry.email.toLowerCase() === email.toLowerCase()) ?? {}),
            email,
          }),
        ),
        tap((settings) => {
          this.patchSettings({ ...this.subject.value, ...settings });
        }),
      );
  }

  updateSettings(settings: Partial<UserSettings>): void {
    this.patchSettings({ ...this.subject.value, ...settings });
  }

  reset(): void {
    this.patchSettings(DEFAULT_SETTINGS);
  }

  private patchSettings(next: UserSettings): void {
    this.subject.next(next);
    if (!environment.accessControl.enableClientPermissionOverrides) {
      return;
    }
    try {
      localStorage.setItem(USER_SETTINGS_STORE_KEY, JSON.stringify(next));
    } catch {
      // Ignore private mode / quota issues for local settings storage.
    }
  }

  private readStoredSettings(): UserSettings {
    if (!environment.accessControl.enableClientPermissionOverrides) {
      return DEFAULT_SETTINGS;
    }
    try {
      const raw = localStorage.getItem(USER_SETTINGS_STORE_KEY);
      if (!raw) {
        return DEFAULT_SETTINGS;
      }
      const parsed = JSON.parse(raw) as Partial<UserSettings>;
      return { ...DEFAULT_SETTINGS, ...parsed };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }
}
