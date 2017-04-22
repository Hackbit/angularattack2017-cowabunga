import { Component, Input, OnInit } from '@angular/core';
import { Achievement } from '../achievement';
import { LocationService } from '../location.service';

@Component({
  selector: 'cowabunga-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css']
})
export class AchievementComponent implements OnInit {

  @Input()
  achievement: Achievement;

  constructor(private locationService: LocationService) {
  }

  ngOnInit() {
  }

  getDistance() {
    return this.locationService.distanceToLocation({
      latitude: this.achievement.location.coordinates.latitude,
      longitude: this.achievement.location.coordinates.longitude
    });
  }
}
