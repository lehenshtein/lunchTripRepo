import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AuthService} from '@shared/services/auth.service';
import {SharedModule} from '@shared/shared.module';

import {AppComponent} from './app.component';
import {DefaultComponent} from './default/default.component';
import {HomeComponent} from './home/home.component';
import {NavComponent} from './layout/nav/nav.component';
import {RegisterComponent} from './register/register.component';
import {ErrorInterceptorProvider} from "@shared/interceptors/error.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
