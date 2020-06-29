import {Routes} from '@angular/router';

import {DefaultComponent} from '@app/default/default.component';
import {AdminGuard} from '@app/guards/admin.guard';
import {AuthGuard} from '@app/guards/auth.guard';
import {HomeComponent} from '@app/home/home.component';
import {ListsComponent} from '@app/lists/lists.component';
import {MemberListComponent} from '@app/members/member-list/member-list.component';
import {MessagesComponent} from '@app/messages/messages.component';
import {MemberListResolver} from '@shared/resolvers/member-list.resolver';

export const AppRoutes: Routes = [
  {path: '', component: HomeComponent},
  // {path: 'members', component: MemberListComponent, canActivate: [AuthGuard]}, // old example
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
      {path: 'messages', component: MessagesComponent},
      {path: 'lists', component: ListsComponent},
      // {path: 'checker', component: DefaultComponent},
      {path: 'checker', component: DefaultComponent, canActivate: [AdminGuard]},
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},

];
