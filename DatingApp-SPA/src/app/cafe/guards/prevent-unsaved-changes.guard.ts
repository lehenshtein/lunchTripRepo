import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';

import {CafeCreateComponent} from '@app/cafe/cafe-create/cafe-create.component';

@Injectable()
export class PreventUnsavedChangesGuard implements CanDeactivate<CafeCreateComponent> {
  canDeactivate(component: CafeCreateComponent): boolean {
    if (component.form.dirty) {
      return confirm('Are you sure? Unsaved changes would be lost');
    }
    return true;
  }

}
