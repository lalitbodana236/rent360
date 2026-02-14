import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PERMISSIONS } from '../../core/constants/permissions';
import { AuthGuard } from '../../core/guards/auth.guard';
import { SharedModule } from '../../shared/shared.module';
import { SettingsPermissionsComponent } from './settings-permissions.component';
import { SettingsUserComponent } from './settings-user.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      { path: 'user', component: SettingsUserComponent },
      {
        path: 'permissions',
        component: SettingsPermissionsComponent,
        canActivate: [AuthGuard],
        data: { permission: PERMISSIONS.authorizationManage },
      },
    ],
  },
];

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsUserComponent,
    SettingsPermissionsComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class SettingsModule {}
