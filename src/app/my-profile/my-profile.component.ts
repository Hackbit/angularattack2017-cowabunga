import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Achievement } from '../achievement';

@Component({
  selector: 'cowabunga-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  constructor(private firebase: AngularFireDatabase) {
  }

  ngOnInit() {
  }

}
