import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-society',
  template:
    '<r360-page-header [title]="title" [subtitle]="subtitle"></r360-page-header><r360-card>{{ description }}</r360-card>',
})
export class SocietyComponent {
  title = 'Society';
  subtitle = 'Buildings, maintenance, meetings, visitors, work orders';
  description = 'Society ERP scaffold as per PRODUCT-DEFINATION.';

  constructor(private readonly route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.title = (data['title'] as string) || this.title;
      this.subtitle = (data['subtitle'] as string) || this.subtitle;
      this.description = (data['description'] as string) || this.description;
    });
  }
}
