import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'firebase/app';
import { UserService } from '../user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';


@Component({
  selector: 'cowabunga-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: Observable<User[]>;

  constructor(
    private database: AngularFireDatabase,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.users = this.userService.getUser()
      .map(user => user.$key)
      .switchMap(key => this.database.object('users')
          .map(users => {
            const array = [];
            Object.keys(users).forEach(userKey => {
              const user = users[userKey];
              user.$key = userKey;
              if (userKey !== key) {
                array.push(user);
              }
            });
            return array;
          })
      );
  }
}
