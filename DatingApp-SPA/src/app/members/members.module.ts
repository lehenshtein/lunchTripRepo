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

import {MemberCardComponent} from './member-card/member-card.component';
import {MemberDetailComponent} from './member-detail/member-detail.component';
import {MemberEditComponent} from './member-edit/member-edit.component';
import {MemberPhotoEditorComponent} from './member-photo-editor/member-photo-editor.component';


@NgModule({
  declarations: [
    MemberListComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    MemberPhotoEditorComponent
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
    MemberCardComponent
  ],
  providers: []
})
export class MembersModule {
}
