import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {SharedModule} from '@shared/shared.module';

import {map} from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
  providedIn: SharedModule
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';

  constructor(
    private http: HttpClient
  ) {
  }
  register(form: Object): Observable<Object> {
    return this.http.post(this.baseUrl + 'register', form);
  }

  login(form: Object): Observable<any> {
    return this.http.post(this.baseUrl + 'login', form)
      .pipe(
        map(res => {
          const user = res;
          if (user) {
            localStorage.setItem('token', user['token']);
          }
        })
      );
  }
}
