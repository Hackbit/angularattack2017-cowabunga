import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/user';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';

@Injectable()
export class UserService {
  constructor(private afAuth: AngularFireAuth, private database: AngularFireDatabase) {
  }

  createUser() {
    this.afAuth.authState.map(user => {
      this.database.object(`users/${this.afAuth.auth.currentUser.uid}`).update(
        { name: user.displayName, photoURL: user.photoURL, achievements: [] }
      );
    }).take(1).subscribe();
  }

  getUser(): Observable<User> {
    if (!this.afAuth.auth.currentUser) {
      return Observable.of(null);
    }
    return this.database.object(`users/${this.afAuth.auth.currentUser.uid}`);
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  isSignedIn() {
    return this.afAuth.authState.map(state => !!state);
  }

  addCheckIn(checkInData) {
    this.getUser().take(1).subscribe(user => {
      this.database.list(`users/${user.$key}/checkIns`).push(checkInData);
    });
  }
}
