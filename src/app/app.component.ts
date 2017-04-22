import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Component({
  selector: 'cowabunga-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cowabunga works!';

  constructor(private afAuth: AngularFireAuth) {

  }

  login() {
    this.afAuth.auth.signInWithPopup(new GoogleAuthProvider()).then(data => alert(JSON.stringify(data)));
  }
}
