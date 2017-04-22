import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import { UserService } from './user.service';

@Component({
  selector: 'cowabunga-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user;

  constructor(private userService: UserService) {
    this.userService.getUser().subscribe(user => this.user = user);
  }
}
