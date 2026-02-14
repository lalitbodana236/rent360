import { Pipe, PipeTransform } from '@angular/core';
import { UserSettingsService } from '../../core/services/user-settings.service';

@Pipe({ name: 'appDate', pure: false })
export class AppDatePipe implements PipeTransform {
  private locale = 'en-US';
  private timeZone = 'America/New_York';
  private timeFormat: '12h' | '24h' = '12h';

  constructor(private readonly settings: UserSettingsService) {
    this.settings.userSettings$.subscribe((user) => {
      this.locale = user.language === 'hi' ? 'hi-IN' : 'en-US';
      this.timeZone = user.timeZone;
      this.timeFormat = user.timeFormat;
    });
  }

  transform(value: string | number | Date): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    return new Intl.DateTimeFormat(this.locale, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: this.timeFormat === '12h',
      timeZone: this.timeZone,
    }).format(date);
  }
}
