import { Component, Input, OnInit } from '@angular/core';
import { CheckIn } from '../check-in';
import { Achievement } from '../achievement';

@Component({
  selector: 'cowabunga-user-check-in',
  templateUrl: './user-check-in.component.html',
  styleUrls: ['./user-check-in.component.css']
})
export class UserCheckInComponent implements OnInit {

  @Input()
  checkIn: CheckIn;

  achievement: Achievement;

  constructor() { }

  ngOnInit() {
    // get achievement
  }

}
