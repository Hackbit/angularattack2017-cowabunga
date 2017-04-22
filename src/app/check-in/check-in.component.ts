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
  description = '';
  timestamp = Date.now();
  images: string[] = [];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private userService: UserService,
              private afDatabase: AngularFireDatabase,
              private storageService: StorageService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
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
      timestamp: this.timestamp,
      checkInTimestamp: Date.now(),
      achievement: this.id
    });
    this.location.back();
  }
}
