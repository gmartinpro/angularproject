import { Component, OnInit } from '@angular/core';
import { Channel } from '../channel';
import { Message } from 'src/app/message';
import { ChatService } from '../chat.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { format } from 'url';
import { UserService } from '../user.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.scss']
})
export class SalonComponent implements OnInit {
  public channelId: string;
  public messages: Message[];
  public userName: string;
  messagesForm = new FormGroup({
    message: new FormControl(['', Validators.required])
  });
  constructor(private chatService: ChatService, private activatedRoute: ActivatedRoute, private userService: UserService) {

  }

  ngOnInit() {
    interval(500)
      .subscribe(() => {
        this.getMessages();
      });
    this.getChannelId();
  }
  getChannelId() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.channelId = params.get('id');
    });
  }
  getMessages() {
    this.chatService.getMessages(this.channelId).subscribe((messages: Message[]) => {
      this.messages = messages && messages.length > 0 ? messages : [];
    },
      error => console.log('Error:', error));
  }
  getUser() {
    this.userService.user.subscribe(user => {
      this.userName = user;
    });
  }
  submitMessage() {
    this.getUser();
    const MESSAGE: Message = {
      message: this.messagesForm.get('message').value,
      date: new Date(),
      userName: this.userName || 'Anonyme'
    };
    this.chatService.setMessage(this.channelId, MESSAGE).subscribe(() => {
      this.messagesForm.get('message').setValue('');
    }, error => console.log('Error:', error));
  }
}
