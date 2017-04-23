import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Achievement } from '../achievement';

@Component({
  selector: 'cowabunga-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css']
})
export class AchievementComponent implements OnInit {

  @Input()
  achievement: Achievement;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  showAchievementDetails() {
    this.router.navigate(['/app/achievement', this.achievement.$key]);
  }
}
