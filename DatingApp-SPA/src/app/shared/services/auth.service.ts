import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {JwtHelperService} from '@auth0/angular-jwt';
import {IToken} from '@shared/interfaces/token.interface';
import {SharedModule} from '@shared/shared.module';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
  register(form: object): Observable<object> {
    return this.http.post('/api/auth/register', form);
  }

  login(form: object): Observable<any> {
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
