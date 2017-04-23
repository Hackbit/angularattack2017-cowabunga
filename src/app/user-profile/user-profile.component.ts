import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { CheckIn } from '../check-in';

@Component({
  selector: 'cowabunga-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  user: Observable<User>;
  checkIns: CheckIn[] = [];
  subscription;

  constructor(private route: ActivatedRoute, private database: AngularFireDatabase) { }

  ngOnInit() {
    this.user = this.route.params
      .map(params => params.id)
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
