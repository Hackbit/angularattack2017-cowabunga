import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Achievement } from '../achievement';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { StorageService } from '../storage.service';
import { Badge } from '../badge';
import { CheckIn } from '../check-in';

@Component({
  selector: 'cowabunga-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, OnDestroy {
  user: User;
  subscription: Subscription;
  checkIns: CheckIn[] = [];

  constructor(
    private database: AngularFireDatabase,
    private router: Router,
    private userService: UserService,
    private storageService: StorageService) {
  }

  ngOnInit() {
    this.subscription = this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        if (user.checkIns) {
          Object.keys(user.checkIns)
            .forEach(key => this.checkIns.push(user.checkIns[key]));
        }
      });
  }

  logout() {
    this.userService.signOut();
    this.router.navigate(['/']);
  }

  upload(event) {
    const file = event.srcElement.files[0];
    this.storageService.saveImage(file).subscribe(url => console.log(url));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
