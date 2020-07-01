import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {PreventUnsavedChangesGuard} from '@app/members/guards/prevent-unsaved-changes.guard';
import {MemberListComponent} from '@app/members/member-list/member-list.component';
import {MembersRoutes} from '@app/members/members.routes';
import {SharedModule} from '@shared/shared.module';

import {MemberCardComponent} from './member-card/member-card.component';
import {MemberDetailComponent} from './member-detail/member-detail.component';
import {MemberEditComponent} from './member-edit/member-edit.component';


@NgModule({
  declarations: [
    MemberListComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MembersRoutes),
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    PreventUnsavedChangesGuard
  ]
})
export class MembersModule { }
