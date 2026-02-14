import { Component } from '@angular/core';

@Component({
  selector: 'r360-card',
  host: { class: 'block' },
  template: '<div class="r360-card"><ng-content></ng-content></div>',
})
export class CardComponent {}
