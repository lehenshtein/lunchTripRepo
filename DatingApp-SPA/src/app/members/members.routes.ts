import {Routes} from '@angular/router';

import {MemberDetailComponent} from '@app/members/member-detail/member-detail.component';
import {MemberDetailResolver} from '@shared/resolvers/member-detail.resolver';

export const MembersRoutes: Routes = [
  {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
];
