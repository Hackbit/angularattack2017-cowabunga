import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Achievement } from '../achievement';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cowabunga-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  user: User;

  constructor(
    private database: AngularFireDatabase,
    private router: Router,
    private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }

  logout() {
    this.userService.signOut();
    this.router.navigate(['/']);
  }

}
