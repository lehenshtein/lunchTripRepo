import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  register() {
    this.authService.register(this.form.value)
      .subscribe(
        res => console.log('registration successful: ', res),
        error => console.info(error));
    console.log(this.form);
  }
  cancel() {
    this.cancelRegister.emit(false);
  }

}
