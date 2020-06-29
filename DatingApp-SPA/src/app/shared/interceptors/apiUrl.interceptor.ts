import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = localStorage.getItem('token');
    req = req.clone({
      // setHeaders: { // if we don't want to use jwtmodule in app.module
      //   Authorization: `Bearer ${token}`
      // },
      url: req.url.indexOf('http') === - 1 ? environment.apiUrl + req.url : req.url
    });
    return next.handle(req);
  }

}
export const ApiUrlInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiUrlInterceptor,
  multi: true
};
