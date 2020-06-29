import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

import {MemberListComponent} from '@app/members/member-list/member-list.component';
import {MembersRoutes} from '@app/members/members.routes';
import {SharedModule} from '@shared/shared.module';

import { MemberCardComponent } from './member-card/member-card.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';



@NgModule({
  declarations: [
    MemberListComponent,
    MemberCardComponent,
    MemberDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(MembersRoutes),
    SharedModule,
  ]
})
export class MembersModule { }
