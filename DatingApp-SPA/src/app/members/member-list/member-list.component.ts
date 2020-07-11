import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {IPaginatedResult, IPagination} from '@shared/interfaces/pagination.interface';
import {IUser} from '@shared/interfaces/user.interface';
import {AlertService} from '@shared/services/alert.service';
import {UserService} from '@shared/services/user.service';

import {PageChangedEvent} from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: Array<IUser>;
  genders = [
    {value: '', displayName: 'All'},
    {value: 'male', displayName: 'Males'},
    {value: 'female', displayName: 'Females'}
  ];
  userParams: any = {
    gender: '',
    minAge: 18,
    maxAge: 99,
    orderBy: 'lastActive'
  };
  pagination: IPagination;
  form = this.fb.group({
    gender: [''],
    minAge: [18],
    maxAge: [99],
    orderBy: ['lastActive']
  });

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private routes: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.routes.data
      .subscribe(res => {
        this.users = res.users.result;
        this.pagination = res.users.pagination;
      });
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.form.value)
      .subscribe(
        (res: IPaginatedResult<IUser>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        },
        error => this.alertService.error(error)
      );
  }

  resetFilters() {
    this.form.reset(this.userParams);
    this.loadUsers();
  }

  pageChanged($event: PageChangedEvent): void {
    this.pagination.currentPage = $event.page;
    this.loadUsers();
  }
}
