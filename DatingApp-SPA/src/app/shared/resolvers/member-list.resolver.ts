import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';

import {IUser} from '@shared/interfaces/user.interface';
import {AlertService} from '@shared/services/alert.service';
import {UserService} from '@shared/services/user.service';

import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<IUser[]> {
  pageNumber = 1;
  pageSize = 10;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IUser[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize)  // it subscribes automatically
      .pipe(catchError(() => {
        this.alertService.error('Problem retrieving data');
        this.router.navigate(['/home']);
        return of(null);
      }));
  }
}
