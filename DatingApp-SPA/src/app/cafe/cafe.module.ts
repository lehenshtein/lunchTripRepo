import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {CafeRoutingModule} from '@app/cafe/cafe-routing.module';
import {SharedModule} from '@shared/shared.module';

import {CafeCreateComponent} from './cafe-create/cafe-create.component';


@NgModule({
  declarations: [
    CafeCreateComponent
  ],
  imports: [
    CommonModule,
    CafeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class CafeModule {
}
