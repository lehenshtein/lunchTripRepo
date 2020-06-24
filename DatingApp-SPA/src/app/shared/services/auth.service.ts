import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {JwtHelperService} from '@auth0/angular-jwt';
import {IToken} from '@shared/interfaces/token.interface';
import {AlertService} from '@shared/services/alert.service';
import {SharedModule} from '@shared/shared.module';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: SharedModule
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  user = {
    id: null,
    role: null
  };
  decodedToken: IToken;
  constructor(
    private http: HttpClient,
    private alertService: AlertService
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
            this.setChars(user.token);
          }
        })
      );
  }
  setChars(token) {
    this.decodedToken = this.jwtHelper.decodeToken(token);
    this.user.id = this.decodedToken.nameid;
    this.getRole(this.user.id).subscribe(
      (res: any) => this.user.role = res.role,
      error => this.alertService.error(error)
    );
  }
  getRole(id: number) {
    return this.http.get(`/api/auth/user/${id}`);
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  logout() {
    localStorage.removeItem('token');
  }
}
