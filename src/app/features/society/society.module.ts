import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { SocietyComponent } from './society.component';

const routes: Routes = [
  {
    path: '',
    component: SocietyComponent,
    data: {
      title: 'Society',
      subtitle: 'Buildings, maintenance, meetings, visitors, work orders',
      description: 'Society ERP scaffold as per PRODUCT-DEFINATION.',
    },
  },
  { path: 'buildings', component: SocietyComponent, data: { title: 'Buildings', subtitle: 'Building and floor hierarchy', description: 'Buildings scaffold.' } },
  { path: 'flats', component: SocietyComponent, data: { title: 'Flats', subtitle: 'Flat and occupancy mapping', description: 'Flats scaffold.' } },
  { path: 'parking', component: SocietyComponent, data: { title: 'Parking', subtitle: 'Slot allocation and availability', description: 'Parking scaffold.' } },
  { path: 'maintenance-collection', component: SocietyComponent, data: { title: 'Maintenance Collection', subtitle: 'Billing cycles and dues', description: 'Maintenance collection scaffold.' } },
  { path: 'meetings', component: SocietyComponent, data: { title: 'Meetings', subtitle: 'AGM/EGM scheduling and attendance', description: 'Meetings scaffold.' } },
  { path: 'notices', component: SocietyComponent, data: { title: 'Notices', subtitle: 'Resident notices and communications', description: 'Notices scaffold.' } },
  { path: 'visitors', component: SocietyComponent, data: { title: 'Visitors', subtitle: 'Entry approval and logs', description: 'Visitor management scaffold.' } },
  { path: 'complaints', component: SocietyComponent, data: { title: 'Complaints', subtitle: 'Issue tracking and resolution', description: 'Complaints scaffold.' } },
  { path: 'work-orders', component: SocietyComponent, data: { title: 'Work Orders', subtitle: 'Vendor assignment and SLA tracking', description: 'Work orders scaffold.' } },
];

@NgModule({ declarations: [SocietyComponent], imports: [SharedModule, RouterModule.forChild(routes)] })
export class SocietyModule {}
