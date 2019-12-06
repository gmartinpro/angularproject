import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './message';
import { Channel } from './channel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public apiUrl: string = 'http://localhost:3000';
  public channelsUrl: string = '/channels';
  constructor(private http: HttpClient) { }

  getChannels(): Observable<any> {
    return this.http.get(this.apiUrl + this.channelsUrl);
  }

  getMessages(idChannel: string): Observable<any> {
    return this.http.get(this.apiUrl + this.channelsUrl + '/' + idChannel + '/messages');
  }

  setMessage(idChannel: string, body: Message) {
    return this.http.post(this.apiUrl + this.channelsUrl + '/' + idChannel + '/messages', body);
  }
}
