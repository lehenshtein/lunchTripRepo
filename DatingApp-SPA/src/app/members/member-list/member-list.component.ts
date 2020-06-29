import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {IUser} from '@shared/interfaces/user.interface';
import {AlertService} from '@shared/services/alert.service';
import {UserService} from '@shared/services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: Array<IUser>;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routes.data
      .subscribe(res => this.users = res.users);
  }
  // loadUsers() {
  //   this.userService.getUsers()
  //     .subscribe(
  //       (res: IUser[]) => this.users = res,
  //       error => this.alertService.error(error)
  //     );
  // }

}
