import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {IUser} from '@shared/interfaces/user.interface';
import {AlertService} from '@shared/services/alert.service';
import {AuthService} from '@shared/services/auth.service';
import {UserService} from '@shared/services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: IUser;
  form: FormGroup;
  photoUrl: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private authService: AuthService
  ) {
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        this.user = data.user;
        this.createForm();
      },
    );
    this.authService.currentPhotoUrl.subscribe(photo => this.photoUrl = photo);
  }

  updateUser() {
    console.log(this.user);
    this.userService.updateUser(this.user.id, this.form.value)
      .subscribe(() => {
          this.alertService.success('Data saved');
          this.form.markAsPristine();
        },
        error => this.alertService.error(error)
      );
  }

  private createForm() {
    this.form = this.fb.group({
      introduction: [this.user.introduction, Validators.required],
      lookingFor: [this.user.lookingFor, Validators.required],
      interests: [this.user.interests, Validators.required],
      city: [this.user.city, Validators.required],
      country: [this.user.country, Validators.required],
    });
  }

  updateMainPhoto($event: string) {
    this.user.photoUrl = $event;
  }
}
