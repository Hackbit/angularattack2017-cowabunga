import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/user.service';
import { User } from 'app/user';

@Component({
  selector: 'cowabunga-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.user = user);
  }

}
