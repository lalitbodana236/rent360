import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PERMISSIONS } from '../../core/constants/permissions';
import { AuthGuard } from '../../core/guards/auth.guard';
import { SharedModule } from '../../shared/shared.module';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Reports',
      subtitle: 'Financial, occupancy, and operational reports',
      description: 'Reports module scaffold as per PRODUCT-DEFINATION.',
      permission: PERMISSIONS.reportsView,
    },
  },
  {
    path: 'communications',
    component: ReportsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Communications',
      subtitle: 'Notices, messages, and communication logs',
      description: 'Communications module scaffold as per PRODUCT-DEFINATION.',
      permission: PERMISSIONS.communicationsView,
    },
  },
  {
    path: 'tasks',
    component: ReportsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tasks',
      subtitle: 'Track pending and completed operational tasks',
      description: 'Tasks module scaffold as per PRODUCT-DEFINATION.',
      permission: PERMISSIONS.tasksView,
    },
  },
];

@NgModule({ declarations: [ReportsComponent], imports: [SharedModule, RouterModule.forChild(routes)] })
export class ReportsModule {}
