import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';

import {IUser} from '@shared/interfaces/user.interface';
import {AlertService} from '@shared/services/alert.service';
import {AuthService} from '@shared/services/auth.service';
import {UserService} from '@shared/services/user.service';

import {EMPTY, Observable, of} from 'rxjs';
import {catchError, mergeMap, take, tap} from 'rxjs/operators';

@Injectable()
export class AuthResolver implements Resolve<IUser> {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> | IUser {
    return this.userService.getUser(+this.authService.decodedToken.nameid)
      .pipe(tap(data => console.log(data)),
        take(1),
        mergeMap((user: IUser) => {
          if (user.role && user.role === 'admin') {
            return of(user.role);
          } else {
            this.alertService.error('Or u wanna be an admin? NO!');
            this.router.navigate(['']);
            return EMPTY;
          }
        }),
        catchError(() => {
          this.alertService.error('Problem retrieving your data');
          this.router.navigate(['']);
          return of(null);
        }));
  }
}
