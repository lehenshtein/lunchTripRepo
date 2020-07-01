import {Routes} from '@angular/router';

import {CafeCreateComponent} from '@app/cafe/cafe-create/cafe-create.component';
import {PreventUnsavedChangesGuard} from '@app/cafe/guards/prevent-unsaved-changes.guard';

export const CafeRoutes: Routes = [
  {
    path: 'cafe',
    children: [
      {path: 'create', component: CafeCreateComponent, canDeactivate: [PreventUnsavedChangesGuard]}
    ]
  },
];
