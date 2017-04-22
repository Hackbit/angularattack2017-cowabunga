import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/user.service';
import { User } from 'app/user';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

@Component({
  selector: 'cowabunga-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: Observable<User>;

  constructor(private userService: UserService, private location: Location) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  back() {
    this.location.back();
  }

}
