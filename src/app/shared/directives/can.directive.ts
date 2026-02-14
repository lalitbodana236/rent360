import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PermissionAccess } from '../../core/authorization/authorization-config';
import { AuthService } from '../../core/services/auth.service';
import { AuthorizationService } from '../../core/services/authorization.service';

@Directive({ selector: '[appCan]' })
export class CanDirective implements OnDestroy {
  private permission = '';
  private minLevel: PermissionAccess = 'read';
  private readonly subscription: Subscription;

  @Input() set appCan(permission: string) {
    this.permission = permission;
    this.render();
  }

  @Input() set appCanMode(level: PermissionAccess) {
    this.minLevel = level;
    this.render();
  }

  constructor(
    private readonly tpl: TemplateRef<unknown>,
    private readonly vcr: ViewContainerRef,
    private readonly auth: AuthService,
    private readonly authorization: AuthorizationService,
  ) {
    this.subscription = this.auth.currentUser$.subscribe(() => this.render());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private render(): void {
    this.vcr.clear();
    if (!this.permission) {
      return;
    }

    if (this.authorization.canAccess(this.permission, this.minLevel)) {
      this.vcr.createEmbeddedView(this.tpl);
    }
  }
}
