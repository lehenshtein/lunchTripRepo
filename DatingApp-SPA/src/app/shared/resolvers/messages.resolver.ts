import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';

import {AlertService} from '@shared/services/alert.service';
import {UserService} from '@shared/services/user.service';
import {IMessage} from "@shared/interfaces/message.interface";
import {AuthService} from "@shared/services/auth.service";

import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class MessagesResolver implements Resolve<IMessage[]> {
  pageNumber = 1;
  pageSize = 10;
  messageContainer = 'Unread';

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IMessage[]> {
    return this.userService.getMessages(this.authService.user.id, this.pageNumber, this.pageSize, this.messageContainer)  // it subscribes automatically
      .pipe(catchError(() => {
        this.alertService.error('Problem retrieving messages');
        this.router.navigate(['/home']);
        return of(null);
      }));
  }
}
