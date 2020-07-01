import {Routes} from '@angular/router';

import {PreventUnsavedChangesGuard} from '@app/members/guards/prevent-unsaved-changes.guard';
import {MemberDetailComponent} from '@app/members/member-detail/member-detail.component';
import {MemberEditComponent} from '@app/members/member-edit/member-edit.component';
import {MemberDetailResolver} from '@shared/resolvers/member-detail.resolver';
import {MemberEditResolver} from '@shared/resolvers/member-edit.resolver';

export const MembersRoutes: Routes = [
  {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
  {path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChangesGuard]},
];
