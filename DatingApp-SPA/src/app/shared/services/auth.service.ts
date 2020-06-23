import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {SharedModule} from '@shared/shared.module';

import {map} from 'rxjs/operators';
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {IToken} from "@shared/interfaces/token.interface";

@Injectable({
  providedIn: SharedModule
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  decodedToken: IToken;
  constructor(
    private http: HttpClient
  ) {
  }
  register(form: Object): Observable<Object> {
    return this.http.post('/api/auth/register', form);
  }

  login(form: Object): Observable<any> {
    return this.http.post('/api/auth/login', form)
      .pipe(
        map((res: any) => {
          const user = res;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
          }
        })
      );
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  logout() {
    localStorage.removeItem('token');
  }
}
