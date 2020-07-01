import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {CafeService} from '@app/cafe/cafe.service';
import {AlertService} from '@shared/services/alert.service';

@Component({
  selector: 'app-cafe-create',
  templateUrl: './cafe-create.component.html',
  styleUrls: ['./cafe-create.component.css']
})
export class CafeCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private cafeService: CafeService
  ) {
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      description: [null]
    });
  }

  createCafe() {
    this.cafeService.createCafe(this.form.value)
      .subscribe(res => {
          console.log(res);
          this.alertService.success('Trying to create cafe');
          this.form.markAsPristine();
        },
        error => this.alertService.error(error)
      );
  }
}
