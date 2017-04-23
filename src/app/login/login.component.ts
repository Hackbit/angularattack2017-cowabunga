import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import { AngularFireAuth } from 'angularfire2/auth';
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
import { UserService } from '../user.service';
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';
import GithubAuthProvider = firebase.auth.GithubAuthProvider;

@Component({
  selector: 'cowabunga-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error;
  signedIn;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  loginGoogle() {
    this.login(new GoogleAuthProvider());
  }

  loginFacebook() {
    this.login(new FacebookAuthProvider());
  }

  loginGithub() {
    this.login(new GithubAuthProvider());
  }

  private login(authprovider) {

    this.afAuth.auth.signInWithPopup(authprovider).then(
      () => {
        this.signedIn = true;
        this.error = null;
        this.userService.createUser();
        this.router.navigate([this.userService.getRedirectUrl()]);
      },
      error => {
        this.error = error;
      }
    );
  }

  logout() {
    this.userService.signOut().then(() => this.signedIn = false);
  }
}
