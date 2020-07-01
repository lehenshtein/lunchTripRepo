import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {CafeRoutes} from '@app/cafe/cafe.routes';
import {PreventUnsavedChangesGuard} from '@app/cafe/guards/prevent-unsaved-changes.guard';
import {SharedModule} from '@shared/shared.module';

import {CafeCreateComponent} from './cafe-create/cafe-create.component';


@NgModule({
  declarations: [
    CafeCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CafeRoutes),
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    PreventUnsavedChangesGuard
  ]
})
export class CafeModule {
}
