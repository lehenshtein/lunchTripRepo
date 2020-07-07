import {Component, OnInit} from '@angular/core';

import {IUser} from '@shared/interfaces/user.interface';
import {AuthService} from '@shared/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user: IUser = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.setChars(token);
    }
    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }
}
