import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Achievement } from '../achievement';
import { StorageService } from '../storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'cowabunga-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {

  id: string;
  achievementName: string;
  description = '';
  timestamp = new Date();
  images: string[] = [];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private userService: UserService,
              private afDatabase: AngularFireDatabase,
              private storageService: StorageService) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params.id)
      .do(id => this.id = id)
      .switchMap(id => this.afDatabase.object(`achievements/${id}`))
      .subscribe(achievement => this.achievementName = achievement.name);
  }

  upload(event) {
    const file = event.srcElement.files[0];
    this.storageService.saveImage(file).subscribe(path => this.images.push(path));
  }

  checkIn() {
    this.images.forEach(image => {
      this.afDatabase.list(`achievements/${this.id}/images`).push(image);
    });
    this.afDatabase.object(`achievements/${this.id}/checkInCount`).$ref.once('value').then(value => {
      this.afDatabase.object(`achievements/${this.id}`).update({
        checkInCount: value.val() + 1
      });
    });
    this.userService.addCheckIn({
      description: this.description,
      images: this.images,
      timestamp: new Date(this.timestamp).getTime(),
      checkInTimestamp: Date.now(),
      achievement: { key: this.id, name: this.achievementName }
    });
    this.location.back();
  }
}
