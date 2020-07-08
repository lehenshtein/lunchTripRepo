import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CafeCreateComponent} from '@app/cafe/cafe-create/cafe-create.component';
import {PreventUnsavedChangesGuard} from '@app/cafe/guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path: '', redirectTo: 'create', pathMatch: 'full'},
  {path: 'create', component: CafeCreateComponent, canDeactivate: [PreventUnsavedChangesGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CafeRoutingModule {
}
