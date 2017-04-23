import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { CheckIn } from '../check-in';
import { UserService } from '../user.service';

@Component({
  selector: 'cowabunga-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  user: Observable<User>;
  checkIns: CheckIn[] = [];
  subscription;
  isMyProfile: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private database: AngularFireDatabase,
    private userService: UserService,
    private router: Router
  ) { }

  logout() {
    this.userService.signOut();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.user = this.route.params
      .map(params => params.id)
      .do(id => {
        this.isMyProfile = this.userService.getUser()
          .map(user => user.$key === id);
      })
      .switchMap(id => this.database.object(`users/${id}`));

    this.subscription = this.user
      .subscribe(user => {
        if (user.checkIns) {
          Object.keys(user.checkIns)
            .forEach(key => this.checkIns.push(user.checkIns[key]));
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
