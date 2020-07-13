import { Component, OnInit } from '@angular/core';
import {IUser} from "@shared/interfaces/user.interface";
import {IPaginatedResult, IPagination} from "@shared/interfaces/pagination.interface";
import {AuthService} from "@shared/services/auth.service";
import {UserService} from "@shared/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "@shared/services/alert.service";
import {PageChangedEvent} from "ngx-bootstrap/pagination";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: IUser[];
  pagination: IPagination;
  likesParam = 'Likers';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(res => {
      this.users = res.users.result;
      this.pagination = res.users.pagination;
    });
  }
  pageChanged($event: PageChangedEvent): void {
    this.pagination.currentPage = $event.page;
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
      .subscribe(
        (res: IPaginatedResult<IUser>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        },
        error => this.alertService.error(error)
      );
  }

}
