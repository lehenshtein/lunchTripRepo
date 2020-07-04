import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {NgxGalleryModule} from '@kolkov/ngx-gallery';

import {TabsModule} from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TabsModule,
    NgxGalleryModule,
  ],
  exports: [
    TabsModule,
    NgxGalleryModule
  ],
})
export class SharedModule { }
