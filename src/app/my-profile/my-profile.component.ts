import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Achievement } from '../achievement';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../user';

@Component({
  selector: 'cowabunga-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  user: User;

  constructor(private database: AngularFireDatabase, private auth: AngularFireAuth) {
  }

  ngOnInit() {
    this.database.object(`users/${this.auth.auth.currentUser.uid}`).subscribe(user => this.user = user);
  }

}
