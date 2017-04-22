import { Component, OnInit } from '@angular/core';
import { Achievement } from '../achievement';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cowabunga-achievement-details',
  templateUrl: './achievement-details.component.html',
  styleUrls: ['./achievement-details.component.css']
})
export class AchievementDetailsComponent implements OnInit {

  achievement: Achievement;

  constructor(private firebase: AngularFireDatabase, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe(id => {
        this.firebase.object(`achievements/${id}`)
          .subscribe(achievement => this.achievement = achievement);
      });
  }

}
