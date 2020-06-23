import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {SharedModule} from '@shared/shared.module';

import {map} from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
  providedIn: SharedModule
})
export class AuthService {
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
        map(res => {
          const user = res;
          if (user) {
            localStorage.setItem('token', user['token']);
          }
        })
      );
  }
}
