import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MessagesRoutingModule} from './messages-routing.module';
import {MessagesComponent} from './messages.component';
import {FormsModule} from "@angular/forms";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {TimeagoModule} from "ngx-timeago";
import {ButtonsModule} from "ngx-bootstrap/buttons";


@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    FormsModule,
    PaginationModule,
    TimeagoModule,
    ButtonsModule
  ]
})
export class MessagesModule {
}
