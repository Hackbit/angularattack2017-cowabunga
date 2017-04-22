import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserService {

  constructor(private afAuth: AngularFireAuth, private database: AngularFireDatabase) { }

  createUser() {
    this.afAuth.authState.map(user => {
      this.database.object(`users/${this.afAuth.auth.currentUser.uid}`).update(
        {name: user.displayName, achievements: []}
      );
    }).subscribe();
  }

  getUser() {
    return this.database.object(`users/${this.afAuth.auth.currentUser.uid}`);
  }
}
