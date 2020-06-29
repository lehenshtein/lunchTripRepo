import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import {ApiUrlInterceptorProvider} from '@shared/interceptors/apiUrl.interceptor';
import {ErrorInterceptorProvider} from '@shared/interceptors/error.interceptor';
import {MemberDetailResolver} from '@shared/resolvers/member-detail.resolver';
import {MemberListResolver} from '@shared/resolvers/member-list.resolver';

import {TabsModule} from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    TabsModule,
    NgxGalleryModule
  ],
  exports: [
    TabsModule,
    NgxGalleryModule
  ],
  providers: [
    ApiUrlInterceptorProvider,
    ErrorInterceptorProvider,
    MemberDetailResolver,
    MemberListResolver
  ],
})
export class SharedModule { }
