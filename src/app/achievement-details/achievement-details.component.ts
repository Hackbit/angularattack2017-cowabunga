import { Component, OnInit } from '@angular/core';
import { Achievement } from '../achievement';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/from';
import MapStyle from './mapstyle';

@Component({
  selector: 'cowabunga-achievement-details',
  templateUrl: './achievement-details.component.html',
  styleUrls: ['./achievement-details.component.scss']
})
export class AchievementDetailsComponent implements OnInit {

  achievement: Achievement;
  userCheckedIn: boolean;
  mapStyle = JSON.parse(MapStyle);

  constructor(private firebase: AngularFireDatabase,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe(id => {
        this.firebase.object(`achievements/${id}`)
          .do(achievement => this.achievement = achievement)
          .switchMap(() => {
            return this.userService.getUser()
              .map(user => this.extractCheckinIds(user))
              .switchMap(checkIns => Observable.from(checkIns))
              .filter(checkIn => checkIn.achievement.key === this.achievement.$key);
          })
          .subscribe(() => this.userCheckedIn = true);
      });
  }

  extractImages(achievement) {
    if (!achievement || !achievement.images) {
      return [];
    }
    const images = [];
    Object.keys(achievement.images)
      .forEach(key => images.push(achievement.images[key]));
    return images;
  }

  private extractCheckinIds(user) {
    if (!user.checkIns) {
      return [];
    }
    const checkIns = [];
    Object.keys(user.checkIns)
      .forEach(key => checkIns.push(user.checkIns[key]));
    return checkIns;
  }
}
