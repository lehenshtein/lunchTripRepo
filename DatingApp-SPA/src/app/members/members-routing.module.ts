import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PreventUnsavedChangesGuard} from '@app/cafe/guards/prevent-unsaved-changes.guard';
import {MemberDetailComponent} from '@app/members/member-detail/member-detail.component';
import {MemberEditComponent} from '@app/members/member-edit/member-edit.component';
import {MemberListComponent} from '@app/members/member-list/member-list.component';
import {MemberDetailResolver} from '@shared/resolvers/member-detail.resolver';
import {MemberEditResolver} from '@shared/resolvers/member-edit.resolver';
import {MemberListResolver} from '@shared/resolvers/member-list.resolver';

const routes: Routes = [
  {path: '', component: MemberListComponent, resolve: {users: MemberListResolver}},
  {path: 'edit', component: MemberEditComponent, resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChangesGuard]},
  {path: ':id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule {
}
