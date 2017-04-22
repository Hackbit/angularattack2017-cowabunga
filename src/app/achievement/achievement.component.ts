import { Component, Input, OnInit } from '@angular/core';
import { Achievement } from '../achievement';
import { LocationService } from '../location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cowabunga-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css']
})
export class AchievementComponent implements OnInit {

  @Input()
  achievement: Achievement;

  constructor(private locationService: LocationService, private router: Router) {
  }

  ngOnInit() {
  }

  getDistance() {
    return this.locationService.distanceToLocation({
      latitude: this.achievement.location.coordinates.latitude,
      longitude: this.achievement.location.coordinates.longitude
    });
  }

  showAchievementDetails() {
    this.router.navigate(['/app/achievement', this.achievement.$key]);
  }
}
