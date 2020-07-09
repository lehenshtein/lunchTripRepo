import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {IUser} from '@shared/interfaces/user.interface';
import {AlertService} from '@shared/services/alert.service';
import {AuthService} from '@shared/services/auth.service';

import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: [];
  @Output() cancelRegister = new EventEmitter();
  form = this.fb.group({
    gender: ['male'],
    username: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(14)]],
    knownAs: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(14)]],
    dateOfBirth: [null, Validators.required],
    city: [null, Validators.required],
    country: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(14)]],
    confirmPassword: [null, [Validators.required]]
  }, {validators: this.passwordMatchValidator});
  controls = {
    gender: this.form.get('gender'),
    username: this.form.get('username'),
    knownAs: this.form.get('knownAs'),
    dateOfBirth: this.form.get('dateOfBirth'),
    city: this.form.get('city'),
    country: this.form.get('country'),
    password: this.form.get('password'),
    confirmPassword: this.form.get('confirmPassword')
  };
  bsConfig: Partial<BsDatepickerConfig>;
  user: IUser;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.bsConfig = {
      containerClass: 'theme-orange'
    };
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  register() {
    if (this.form.valid) {
      this.user = Object.assign({}, this.form.value);
      this.authService.register(this.form.value)
        .subscribe(
          () => this.alertService.success('Registration successful'),
          error => this.alertService.error(error),
          () => this.authService.login(this.form.value).subscribe(() => {
            this.router.navigate(['/members']);
          })
        );
    }
    console.log(this.form.value);
  }
  cancel() {
    this.cancelRegister.emit(false);
  }

}
