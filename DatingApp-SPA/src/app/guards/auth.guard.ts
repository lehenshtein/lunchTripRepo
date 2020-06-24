import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AlertService} from '@shared/services/alert.service';
import {AuthService} from '@shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}
  canActivate(): boolean {
    if (this.authService.loggedIn()) { return true; }
    this.alertService.error('You shall not paaaass!!!');
    this.router.navigate(['/home']);
    return false;
  }

}
