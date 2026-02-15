import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

interface RingMetric {
  label: string;
  value: string;
  percent: number;
  color: string;
}

interface TrendSeries {
  label: string;
  color: string;
  values: number[];
}

interface BarDatum {
  label: string;
  value: number;
  color: string;
}

interface ReportScene {
  caption: string;
  ringMetrics: RingMetric[];
  trendLabels: string[];
  trendSeries: TrendSeries[];
  bars: BarDatum[];
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnDestroy {
  title = 'Reports';
  subtitle = 'Financial, occupancy, and operational reports';
  description = 'Reports module scaffold as per PRODUCT-DEFINATION.';
  scene: ReportScene = this.buildScene('reports');
  private readonly chartW = 360;
  private readonly chartH = 160;
  private readonly chartPad = 18;
  private readonly ringRadius = 40;
  private readonly ringCircumference = 2 * Math.PI * this.ringRadius;
  readonly ringDashArray = this.ringCircumference.toFixed(3);
  private routeSubscription?: Subscription;

  constructor(private readonly route: ActivatedRoute) {
    this.routeSubscription = this.route.data.subscribe((data) => {
      this.title = (data['title'] as string) || this.title;
      this.subtitle = (data['subtitle'] as string) || this.subtitle;
      this.description = (data['description'] as string) || this.description;
      this.scene = this.buildScene(this.resolveSceneKey(this.title));
    });
  }

  ringOffset(percent: number): number {
    const clamped = Math.max(0, Math.min(100, percent));
    return this.ringCircumference - (this.ringCircumference * clamped) / 100;
  }

  trendPath(values: number[]): string {
    if (values.length < 2) {
      return '';
    }
    const max = Math.max(...values);
    const min = Math.min(...values);
    const span = Math.max(max - min, 1);
    const step = (this.chartW - this.chartPad * 2) / (values.length - 1);

    return values
      .map((value, index) => {
        const x = this.chartPad + step * index;
        const y =
          this.chartH -
          this.chartPad -
          ((value - min) / span) * (this.chartH - this.chartPad * 2);
        return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(' ');
  }

  trendArea(values: number[]): string {
    if (values.length < 2) {
      return '';
    }
    const line = this.trendPath(values);
    const step = (this.chartW - this.chartPad * 2) / (values.length - 1);
    const endX = this.chartPad + step * (values.length - 1);
    return `${line} L ${endX.toFixed(2)} ${(this.chartH - this.chartPad).toFixed(2)} L ${this.chartPad.toFixed(2)} ${(this.chartH - this.chartPad).toFixed(2)} Z`;
  }

  barHeight(value: number): number {
    const max = Math.max(...this.scene.bars.map((bar) => bar.value), 1);
    return Math.max(12, Math.round((value / max) * 140));
  }

  trackByMetric(_: number, metric: RingMetric): string {
    return metric.label;
  }

  trackBySeries(_: number, series: TrendSeries): string {
    return series.label;
  }

  trackByBar(_: number, bar: BarDatum): string {
    return bar.label;
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  private resolveSceneKey(title: string): 'reports' | 'communications' | 'tasks' {
    const key = title.toLowerCase();
    if (key.includes('communication')) {
      return 'communications';
    }
    if (key.includes('task')) {
      return 'tasks';
    }
    return 'reports';
  }

  private buildScene(type: 'reports' | 'communications' | 'tasks'): ReportScene {
    if (type === 'communications') {
      return {
        caption: 'Message throughput, delivery quality, and engagement trend',
        ringMetrics: [
          { label: 'Delivery Rate', value: '96%', percent: 96, color: '#06b6d4' },
          { label: 'Open Rate', value: '68%', percent: 68, color: '#14b8a6' },
          { label: 'Action Rate', value: '41%', percent: 41, color: '#22c55e' },
        ],
        trendLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        trendSeries: [
          { label: 'Sent', color: '#0ea5e9', values: [320, 410, 390, 480, 530, 470, 560] },
          { label: 'Read', color: '#14b8a6', values: [240, 302, 288, 345, 390, 350, 425] },
        ],
        bars: [
          { label: 'Notices', value: 68, color: '#06b6d4' },
          { label: 'Broadcasts', value: 44, color: '#22c55e' },
          { label: 'Alerts', value: 57, color: '#f59e0b' },
          { label: 'Reminders', value: 36, color: '#6366f1' },
        ],
      };
    }

    if (type === 'tasks') {
      return {
        caption: 'Workload completion, SLA adherence, and team velocity',
        ringMetrics: [
          { label: 'Completion', value: '82%', percent: 82, color: '#22c55e' },
          { label: 'On-Time SLA', value: '74%', percent: 74, color: '#0ea5e9' },
          { label: 'Backlog Burn', value: '63%', percent: 63, color: '#f97316' },
        ],
        trendLabels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
        trendSeries: [
          { label: 'Created', color: '#ef4444', values: [42, 47, 45, 53, 49, 50] },
          { label: 'Resolved', color: '#22c55e', values: [31, 36, 39, 45, 46, 48] },
        ],
        bars: [
          { label: 'Electrical', value: 48, color: '#22c55e' },
          { label: 'Plumbing', value: 33, color: '#06b6d4' },
          { label: 'Lift', value: 28, color: '#f59e0b' },
          { label: 'Security', value: 41, color: '#8b5cf6' },
        ],
      };
    }

    return {
      caption: 'Revenue pulse, occupancy stability, and risk indicators',
      ringMetrics: [
        { label: 'Rent Collection', value: '88%', percent: 88, color: '#14b8a6' },
        { label: 'Occupancy', value: '79%', percent: 79, color: '#0ea5e9' },
        { label: 'Defaulter Risk', value: '27%', percent: 27, color: '#f59e0b' },
      ],
      trendLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      trendSeries: [
        { label: 'Collected', color: '#14b8a6', values: [112, 124, 130, 126, 139, 144, 151] },
        { label: 'Outstanding', color: '#ef4444', values: [44, 41, 39, 36, 34, 31, 30] },
      ],
      bars: [
        { label: 'Rent', value: 151, color: '#14b8a6' },
        { label: 'Maintenance', value: 96, color: '#0ea5e9' },
        { label: 'Penalty', value: 32, color: '#f59e0b' },
        { label: 'Services', value: 64, color: '#8b5cf6' },
      ],
    };
  }
}
