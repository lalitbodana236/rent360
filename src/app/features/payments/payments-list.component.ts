import { Component } from '@angular/core';
import { PERMISSIONS } from '../../core/constants/permissions';
import { AuthService } from '../../core/services/auth.service';
import { AuthorizationService } from '../../core/services/authorization.service';

type PaymentStatus = 'Paid' | 'Due' | 'Late';

interface PaymentRow {
  id: string;
  tenantName: string;
  tenantEmail: string;
  property: string;
  unit: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
}

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
})
export class PaymentsListComponent {
  search = '';

  private readonly allRows: PaymentRow[] = [
    {
      id: 'P-101',
      tenantName: 'Terry Tenant',
      tenantEmail: 'tenant@rent360.com',
      property: 'Maple Residency',
      unit: 'A-101',
      amount: 1250,
      dueDate: '2026-02-10',
      status: 'Paid',
    },
    {
      id: 'P-102',
      tenantName: 'Terry Tenant',
      tenantEmail: 'tenant@rent360.com',
      property: 'Maple Residency',
      unit: 'A-101',
      amount: 1280,
      dueDate: '2026-03-10',
      status: 'Due',
    },
    {
      id: 'P-103',
      tenantName: 'Nina Owner Tenant',
      tenantEmail: 'owner-tenant@rent360.com',
      property: 'ABC',
      unit: 'A-201',
      amount: 1400,
      dueDate: '2026-02-05',
      status: 'Late',
    },
    {
      id: 'P-104',
      tenantName: 'Tina Tenant Society',
      tenantEmail: 'tenant-society@rent360.com',
      property: 'City Nest',
      unit: 'B-12',
      amount: 980,
      dueDate: '2026-02-08',
      status: 'Paid',
    },
  ];

  constructor(
    private readonly auth: AuthService,
    private readonly authorization: AuthorizationService,
  ) {}

  get isTenantView(): boolean {
    return this.auth.snapshotUser?.roles.includes('tenant') ?? false;
  }

  get canManagePayments(): boolean {
    return this.authorization.canWrite(PERMISSIONS.paymentsWrite);
  }

  get filteredRows(): PaymentRow[] {
    const byRole = this.scopeRowsByRole();
    const key = this.search.trim().toLowerCase();
    if (!key) {
      return byRole;
    }

    return byRole.filter((row) =>
      [
        row.id,
        row.tenantName,
        row.property,
        row.unit,
        row.status,
        row.dueDate,
      ]
        .join(' ')
        .toLowerCase()
        .includes(key),
    );
  }

  get totalDueAmount(): number {
    return this.filteredRows
      .filter((row) => row.status !== 'Paid')
      .reduce((sum, row) => sum + row.amount, 0);
  }

  get paidAmount(): number {
    return this.filteredRows
      .filter((row) => row.status === 'Paid')
      .reduce((sum, row) => sum + row.amount, 0);
  }

  get pendingCount(): number {
    return this.filteredRows.filter((row) => row.status !== 'Paid').length;
  }

  private scopeRowsByRole(): PaymentRow[] {
    if (!this.isTenantView) {
      return this.allRows;
    }

    const user = this.auth.snapshotUser;
    if (!user) {
      return [];
    }

    const email = user.email.toLowerCase();
    const name = user.fullName.toLowerCase();

    return this.allRows.filter(
      (row) =>
        row.tenantEmail.toLowerCase() === email ||
        row.tenantName.toLowerCase() === name,
    );
  }
}
