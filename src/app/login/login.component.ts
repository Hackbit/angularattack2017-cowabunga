import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import { AngularFireAuth } from 'angularfire2/auth';
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;

@Component({
  selector: 'cowabunga-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error;
  signedIn;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  loginGoogle() {
    this.login(new GoogleAuthProvider());
  }

  loginFacebook() {
    this.login(new FacebookAuthProvider());
  }

  private login(authprovider) {
    // TODO check why error doesn't update
    this.afAuth.auth.signInWithPopup(authprovider).then(
      data => {
        this.signedIn = true;
        this.error = null;
      },
      error => {
        this.error = error;
      }
    );
  }

  logout() {
    this.afAuth.auth.signOut().then(() => this.signedIn = false);
  }
}
