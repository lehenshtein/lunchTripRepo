import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {JwtHelperService} from '@auth0/angular-jwt';
import {IToken} from '@shared/interfaces/token.interface';
import {IUser} from '@shared/interfaces/user.interface';
import {AlertService} from '@shared/services/alert.service';

import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  user = {
    id: null,
    role: null
  };
  currentUser: IUser;
  decodedToken: IToken;
  currentPhotoUrlSubject = new BehaviorSubject<string>('../../assets/images/user1.png');
  currentPhotoUrl = this.currentPhotoUrlSubject.asObservable();

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {
  }

  changeMemberPhoto(photoUrl: string) {
    this.currentPhotoUrlSubject.next(photoUrl);
  }

  register(user: IUser): Observable<object> {
    return this.http.post('/api/auth/register', user);
  }

  login(form: object): Observable<any> {
    return this.http.post('/api/auth/login', form)
      .pipe(
        map((res: any) => {
          const user = res;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.setChars(user.token);
            this.currentUser = user.user;
            this.changeMemberPhoto(this.currentUser.photoUrl);
          }
        })
      );
  }
  setChars(token) {
    this.decodedToken = this.jwtHelper.decodeToken(token);
    this.user.id = this.decodedToken.nameid;
    this.getRole().subscribe(
      (res: any) => this.user.role = res.role,
      error => this.alertService.error(error)
    );
  }
  getRole() {
    return this.http.get(`/api/users/${this.user.id}`);
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.currentUser = null;
    this.user = {
      id: null,
      role: null
    };
    this.alertService.warning('Logged out');
  }
}
