import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  profileForm = new FormGroup({
    name: new FormControl()
  });
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

  }

  submitName() {
    this.userService.setUser(this.profileForm.get('name').value);
    this.router.navigateByUrl('chat');
  }

}
