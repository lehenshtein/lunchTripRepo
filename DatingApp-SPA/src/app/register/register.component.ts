import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import {AlertService} from '@shared/services/alert.service';
import {AuthService} from '@shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: [];
  @Output() cancelRegister = new EventEmitter();
  form = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }
  register() {
    this.authService.register(this.form.value)
      .subscribe(
        () => this.alertService.success('Registration successful'),
        error => this.alertService.error(error)
      )
  }
  cancel() {
    this.cancelRegister.emit(false);
  }

}
