import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from '@app/app-routing.module';
import {DefaultModule} from '@app/default/default.module';
import {JwtModule} from '@auth0/angular-jwt';
import {ApiUrlInterceptorProvider} from '@shared/interceptors/apiUrl.interceptor';
import {ErrorInterceptorProvider} from '@shared/interceptors/error.interceptor';
import {AuthResolver} from '@shared/resolvers/auth.resolver';
import {MemberDetailResolver} from '@shared/resolvers/member-detail.resolver';
import {MemberEditResolver} from '@shared/resolvers/member-edit.resolver';
import {MemberListResolver} from '@shared/resolvers/member-list.resolver';
import {SharedModule} from '@shared/shared.module';

import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {TimeagoModule} from 'ngx-timeago';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavComponent} from './layout/nav/nav.component';
import {ListsComponent} from './lists/lists.component';
import {MessagesComponent} from './messages/messages.component';
import {RegisterComponent} from './register/register.component';
import {ListResolver} from "@shared/resolvers/lists.resolver";
import {MembersModule} from "@app/members/members.module";

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
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DefaultModule,
    SharedModule,
    TabsModule.forRoot(),
    TimeagoModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    JwtModule.forRoot({ // we can remove this and use commented method in apiUrl.interceptor
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    }),
    MembersModule,
    FormsModule
  ],
  providers: [
    AuthResolver,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    ApiUrlInterceptorProvider,
    ErrorInterceptorProvider,
    ListResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
