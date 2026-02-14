import { Injectable } from '@angular/core';

@Injectable()
export class ThemeService {
  private readonly key = 'r360_theme';
  private readonly disableClass = 'theme-switching';

  constructor() {
    const stored = localStorage.getItem(this.key);
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }

  toggleTheme(): void {
    const root = document.documentElement;

    // Prevent heavy transition repaint during theme flip.
    root.classList.add(this.disableClass);
    root.classList.toggle('dark');

    const mode = root.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem(this.key, mode);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove(this.disableClass);
      });
    });
  }
}
