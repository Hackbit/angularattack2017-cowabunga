import { Component, OnInit } from '@angular/core';
import { Achievement } from '../achievement';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cowabunga-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  achievements: Observable<Achievement[]>;
  type: string;

  constructor(private firebase: AngularFireDatabase, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(({ type = 'Near by'}) => {
      this.type = type;
    });
  }

  ngOnInit() {
    this.achievements = this.firebase.list('achievements');
  }
}
