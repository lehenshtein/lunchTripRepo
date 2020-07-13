import {Component, Input, OnInit} from '@angular/core';

import {IUser} from '@shared/interfaces/user.interface';
import {AuthService} from "@shared/services/auth.service";
import {UserService} from "@shared/services/user.service";
import {AlertService} from "@shared/services/alert.service";

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: IUser;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }
  sendLike(recipientId: number) {
    this.userService.sendLike(this.authService.user.id, recipientId).subscribe(
      () => this.alertService.success(`You liked: ${this.user.knownAs}`),
      error => this.alertService.error(error)
    )
  }

}
