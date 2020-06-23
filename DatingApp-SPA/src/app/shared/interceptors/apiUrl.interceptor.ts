import {Injectable} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
      url: req.url.indexOf('http') === - 1 ? environment.apiUrl + req.url : req.url
    })
    return next.handle(req);
  }

}
export const ApiUrlInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiUrlInterceptor,
  multi: true
}
