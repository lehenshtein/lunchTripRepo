import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';

import {MemberEditComponent} from '@app/members/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {
  canDeactivate(component: MemberEditComponent): boolean {
    if (component.form.dirty) {
      return confirm('Are you sure? Unsaved changes would be lost');
    }
    return true;
  }

}
