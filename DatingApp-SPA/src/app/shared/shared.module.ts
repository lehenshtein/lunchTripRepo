import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {NgxGalleryModule} from '@kolkov/ngx-gallery';

import {TabsModule} from 'ngx-bootstrap/tabs';
import {MemberCardComponent} from "@shared/components/member-card/member-card.component";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    MemberCardComponent
  ],
  imports: [
    CommonModule,
    TabsModule,
    NgxGalleryModule,
    RouterModule
  ],
  exports: [
    TabsModule,
    NgxGalleryModule,
    MemberCardComponent
  ],
  entryComponents: [
    MemberCardComponent
  ],
})
export class SharedModule { }
