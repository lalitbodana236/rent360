import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PERMISSIONS } from '../../core/constants/permissions';
import { AuthGuard } from '../../core/guards/auth.guard';
import { PaymentsListComponent } from './payments-list.component';
import { CreatePaymentComponent } from './create-payment.component';

const routes: Routes = [
  { path: '', component: PaymentsListComponent },
  {
    path: 'create',
    component: CreatePaymentComponent,
    canActivate: [AuthGuard],
    data: { permission: PERMISSIONS.paymentsWrite },
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class PaymentsRoutingModule {}
