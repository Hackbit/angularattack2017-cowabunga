import { Component, Input, OnInit } from '@angular/core';
import { Achievement } from '../achievement';

@Component({
  selector: 'cowabunga-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css']
})
export class AchievementComponent implements OnInit {

  @Input()
  achievement: Achievement;

  constructor() {
  }

  ngOnInit() {
  }

}
