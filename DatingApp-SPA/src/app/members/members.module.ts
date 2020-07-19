import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MemberListComponent} from '@app/members/member-list/member-list.component';
import {MembersRoutingModule} from '@app/members/members-routing.module';
import {SharedModule} from '@shared/shared.module';

import {FileUploadModule} from 'ng2-file-upload';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {TimeagoModule} from 'ngx-timeago';

import {MemberDetailComponent} from './member-detail/member-detail.component';
import {MemberEditComponent} from './member-edit/member-edit.component';
import {MemberPhotoEditorComponent} from './member-photo-editor/member-photo-editor.component';
import { MemberMessagesComponent } from './member-messages/member-messages.component';


@NgModule({
  declarations: [
    MemberListComponent,
    MemberDetailComponent,
    MemberEditComponent,
    MemberPhotoEditorComponent,
    MemberMessagesComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule,
    FileUploadModule,
    ReactiveFormsModule,
    TimeagoModule,
    PaginationModule,
    FormsModule,
    ButtonsModule,
  ],
  exports: [
  ],
  providers: []
})
export class MembersModule {
}
