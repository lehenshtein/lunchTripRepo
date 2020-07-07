import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DefaultComponent} from '@app/default/default.component';
import {AuthGuard} from '@app/guards/auth.guard';
import {HomeComponent} from '@app/home/home.component';
import {ListsComponent} from '@app/lists/lists.component';
import {MessagesComponent} from '@app/messages/messages.component';
import {AuthResolver} from '@shared/resolvers/auth.resolver';

const routes: Routes = [
  {path: '', component: HomeComponent},
  // {path: 'members', component: MemberListComponent, canActivate: [AuthGuard]}, // old example
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        loadChildren: () => import('./members/members.module').then(m => m.MembersModule),
      },
      {path: 'messages', component: MessagesComponent},
      {path: 'lists', component: ListsComponent},
      {path: 'cafe', loadChildren: () => import('./cafe/cafe.module').then(m => m.CafeModule)},
      {path: 'checker', component: DefaultComponent, resolve: {user: AuthResolver}}, // auth resolver for admin role checking
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
