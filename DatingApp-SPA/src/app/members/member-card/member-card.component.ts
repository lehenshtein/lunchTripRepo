import {Component, Input, OnInit} from '@angular/core';

import {IUser} from '@shared/interfaces/user.interface';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: IUser;

  constructor() { }

  ngOnInit(): void {
  }

}
