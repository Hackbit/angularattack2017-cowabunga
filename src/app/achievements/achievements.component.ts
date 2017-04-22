import { Component, OnInit } from '@angular/core';
import { Achievement } from '../achievement';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cowabunga-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  achievements: Observable<Achievement[]>;

  constructor(private firebase: AngularFireDatabase) {
  }

  ngOnInit() {
    this.achievements = this.firebase.list('achievements');
  }
}
