import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AlertService} from '@shared/services/alert.service';
import {AuthService} from '@shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}
  canActivate(): boolean {
    if (this.authService.user.role === 'admin') { return true; }
    this.alertService.error('Or u wanna be an admin? NO!');
    this.router.navigate(['/home']);
    return false;
  }

}
