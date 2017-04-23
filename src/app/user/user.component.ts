import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'cowabunga-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  user: User;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToUserProfile() {
    this.router.navigate(['/app/user-profile', this.user.$key]);
  }

}
