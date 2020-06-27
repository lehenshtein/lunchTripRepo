import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {DefaultModule} from '@app/default/default.module';
import {AppRoutes} from '@app/routes.module';
import {ApiUrlInterceptorProvider} from '@shared/interceptors/apiUrl.interceptor';
import {ErrorInterceptorProvider} from '@shared/interceptors/error.interceptor';
import {AuthService} from '@shared/services/auth.service';
import {SharedModule} from '@shared/shared.module';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NavComponent} from './layout/nav/nav.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import {RegisterComponent} from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DefaultModule,
    RouterModule.forRoot(AppRoutes),
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    AuthService,
    ApiUrlInterceptorProvider,
    ErrorInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
