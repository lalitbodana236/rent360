import { Pipe, PipeTransform } from '@angular/core';
import { UserSettingsService } from '../../core/services/user-settings.service';

@Pipe({ name: 'appCurrency', pure: false })
export class AppCurrencyPipe implements PipeTransform {
  private currency: 'USD' | 'INR' | 'EUR' | 'GBP' | 'AED' = 'USD';
  private locale = 'en-US';

  constructor(private readonly settings: UserSettingsService) {
    this.settings.userSettings$.subscribe((user) => {
      this.currency = user.currency;
      this.locale = user.language === 'hi' ? 'hi-IN' : 'en-US';
    });
  }

  transform(value: number): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
      maximumFractionDigits: 2,
    }).format(value);
  }
}
