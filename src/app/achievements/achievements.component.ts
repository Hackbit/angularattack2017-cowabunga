import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Achievement } from '../achievement';
import { LocationService } from '../location.service';

@Component({
  selector: 'cowabunga-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  achievements: Observable<Achievement[]>;
  type: string;

  constructor(private locationService: LocationService, private firebase: AngularFireDatabase, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(({ type = 'Nearby' }) => {
      this.type = type;
      this.achievements = this.firebase.list('achievements')
        .do(_achievements => _achievements
          .forEach(achievement => achievement.distance = this.getDistance(achievement))
        );
      if (this.type === 'Nearby') {
        this.achievements = this.achievements.map(_achievements => _achievements.sort((a, b) => {
          if (a.distance === b.distance) {
            return 0;
          }
          return a.distance > b.distance ? 1 : -1;
        }));
      }
    });
  }

  getDistance(achievement: Achievement) {
    return this.locationService.distanceToLocation({
      latitude: achievement.location.coordinates.latitude,
      longitude: achievement.location.coordinates.longitude
    });
  }

  getAchievementsGrouped(achievements: Achievement[]) {
    if (!achievements) {
      return [];
    }
    return achievements.reduce((groups, currentValue) => {
      if (!groups.includes(currentValue.location.country)) {
        groups.push(currentValue.location.country);
      }
      return groups;
    }, []).map(group => {
      return {
        group: group,
        achievements: achievements.filter(achievement => achievement.location.country === group)
      };
    });
  }
}
