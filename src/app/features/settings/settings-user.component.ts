import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  UserSettings,
  UserSettingsService,
} from '../../core/services/user-settings.service';

@Component({
  selector: 'app-settings-user',
  templateUrl: './settings-user.component.html',
  styleUrls: ['./settings-user.component.scss'],
})
export class SettingsUserComponent implements OnInit {
  saved = false;

  readonly form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    mobileNumber: ['', [Validators.required, Validators.minLength(5)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    currency: ['USD' as 'USD' | 'INR' | 'EUR' | 'GBP' | 'AED', Validators.required],
    defaultDashboard: ['owner' as 'owner' | 'tenant', Validators.required],
    timeFormat: ['12h' as '12h' | '24h', Validators.required],
    timeZone: ['America/New_York', Validators.required],
    language: ['en' as 'en' | 'hi', Validators.required],
    notifyEmail: [true],
    notifyWhatsApp: [false],
    notifyInApp: [true],
    whatsAppNumber: [''],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly userSettings: UserSettingsService,
  ) {}

  ngOnInit(): void {
    const current = this.userSettings.snapshot;
    this.form.patchValue({
      ...current,
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const payload: Partial<UserSettings> = {
      fullName: raw.fullName ?? '',
      email: raw.email ?? '',
      mobileNumber: raw.mobileNumber ?? '',
      address: raw.address ?? '',
      currency: raw.currency ?? 'USD',
      defaultDashboard: raw.defaultDashboard ?? 'owner',
      timeFormat: raw.timeFormat ?? '12h',
      timeZone: raw.timeZone ?? 'America/New_York',
      language: raw.language ?? 'en',
      notifyEmail: raw.notifyEmail ?? true,
      notifyWhatsApp: raw.notifyWhatsApp ?? false,
      notifyInApp: raw.notifyInApp ?? true,
      whatsAppNumber: raw.whatsAppNumber ?? '',
    };

    this.userSettings.updateSettings(payload);
    this.saved = true;
    setTimeout(() => {
      this.saved = false;
    }, 2000);
  }
}
