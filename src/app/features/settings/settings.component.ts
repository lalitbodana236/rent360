import { Component } from '@angular/core';
import { PERMISSIONS } from '../../core/constants/permissions';
import { AuthorizationService } from '../../core/services/authorization.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  readonly canViewPermissions: boolean;

  constructor(private readonly authorization: AuthorizationService) {
    this.canViewPermissions = this.authorization.canView(
      PERMISSIONS.authorizationManage,
    );
  }
}
