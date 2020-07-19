import {Component, Input, OnInit} from '@angular/core';
import {IMessage} from "@shared/interfaces/message.interface";
import {UserService} from "@shared/services/user.service";
import {AuthService} from "@shared/services/auth.service";
import {AlertService} from "@shared/services/alert.service";
import {FormBuilder, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Array<IMessage>;
  newMessage: any = {};
  form = this.fb.group({
    message: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    const userId = +this.authService.user.id;
    this.userService.getMessageThread(this.authService.user.id, this.recipientId)
      .pipe(tap(res => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].isRead === false && res[i].recipientId === userId) {
            this.userService.markAsRead(res[i].id, userId);
          }
        }
      }))
      .subscribe((res: Array<IMessage>) => {
          this.messages = res;
        },
        error => this.alertService.error(error)
      );
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.newMessage.content = this.form.get('message').value;
    this.userService.sendMessage(this.authService.user.id, this.newMessage).subscribe((res: IMessage) => {
        this.messages.unshift(res);
        this.newMessage = {};
        this.form.reset();
      },
      error => this.alertService.error(error));
  }
}
