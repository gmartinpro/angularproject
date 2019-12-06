import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Chat';
  public userName: string;
  constructor(public userService: UserService, public router: Router) {

  }
  ngOnInit(): void {
    this.userService.user.subscribe((name: string) => {
      this.userName = name;
    });
  }
  disconnect(): void {
    this.userService.setUser('');
    this.router.navigateByUrl('/login')
  }
}
