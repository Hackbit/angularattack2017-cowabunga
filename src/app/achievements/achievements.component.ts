import { Component, OnInit } from '@angular/core';
import { Achievement } from '../achievement';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'cowabunga-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  achievements: Achievement[];

  constructor(private firebase: AngularFireDatabase) {
  }

  ngOnInit() {
    this.firebase.list('achievements').subscribe(list => this.achievements = list);
  }
}
