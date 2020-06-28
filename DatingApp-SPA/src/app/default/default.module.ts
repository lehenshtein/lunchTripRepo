import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {DefaultComponent} from '@app/default/default.component';

import { SquaresComponent } from './sqyares/squares.component';



@NgModule({
  declarations: [
    DefaultComponent,
    SquaresComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DefaultModule { }
