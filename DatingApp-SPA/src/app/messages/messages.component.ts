import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {IMessage} from "@shared/interfaces/message.interface";
import {IPaginatedResult, IPagination} from "@shared/interfaces/pagination.interface";
import {UserService} from "@shared/services/user.service";
import {AlertService} from "@shared/services/alert.service";
import {AuthService} from "@shared/services/auth.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Array<IMessage>
  pagination: IPagination;
  messageContainer = 'Unread';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.messages = data.messages.result;
      this.pagination = data.messages.pagination;
    })
  }

  loadMessages() {
    this.userService.getMessages(this.authService.user.id, this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
      .subscribe((res: IPaginatedResult<IMessage>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      }, error => this.alertService.error(error))
  }

  deleteMessage($event, messageId: number) {
    $event.stopPropagation();
    this.alertService.confirm('Are you sure you want to delete this message?', () => {
      this.userService.deleteMessage(messageId, this.authService.user.id).subscribe(() => {
        const deletingMessage = this.messages.findIndex(el => el.id === messageId);
        if (deletingMessage !== -1) {
          this.messages.splice(deletingMessage, 1);
          this.alertService.success('Message has been deleted');
        }
      }, error => this.alertService.error(error))
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages()
  }

}
