import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {DefaultModule} from '@app/default/default.module';
import {MembersModule} from '@app/members/members.module';
import {AppRoutes} from '@app/routes';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthService} from '@shared/services/auth.service';
import {SharedModule} from '@shared/shared.module';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavComponent} from './layout/nav/nav.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import {RegisterComponent} from './register/register.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ListsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DefaultModule,
    MembersModule,
    RouterModule.forRoot(AppRoutes),
    SharedModule,
    TabsModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    JwtModule.forRoot({ // we can remove this and use commented method in apiUrl.interceptor
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
