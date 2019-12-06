import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public channels;
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getChannels().subscribe(data => {
      this.channels = data;
    },
      error => console.log('Error:', error));
  }

}
