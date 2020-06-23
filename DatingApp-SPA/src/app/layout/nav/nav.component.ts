import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import {AlertService} from '@shared/services/alert.service';
import {AuthService} from '@shared/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  form = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.form.value)
      .subscribe(
        () => this.alertService.success('Logged in.'),
        error => this.alertService.error(error));
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.logout();
    this.alertService.warning('Logged out');
  }
}
