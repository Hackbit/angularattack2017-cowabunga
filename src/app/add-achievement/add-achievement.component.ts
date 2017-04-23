import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'cowabunga-add-achievement',
  templateUrl: './add-achievement.component.html',
  styleUrls: ['./add-achievement.component.scss']
})
export class AddAchievementComponent implements OnInit {

  photoURL;
  name;
  description;
  longitude;
  latitude;
  country;
  uploadElement;

  constructor(private database: AngularFireDatabase) { }

  ngOnInit() {
  }

  save() {
    const achievement = {
      name: this.name,
      description: this.description,
      imageUrl: this.photoURL,
      location: { country: this.country, coordinates: {longitude: +this.longitude, latitude: +this.latitude }}
    };
    this.database.list('achievements').push(achievement);
    this.clear();
    alert('Saved!');
  }

  private clear() {
    this.photoURL = '';
    this.name = '';
    this.description = '';
    this.longitude = '';
    this.latitude = '';
    this.country = '';
    this.uploadElement.files = '';
  }

  upload(event) {
    const file = event.srcElement.files[0];
    this.uploadElement = event.srcElement;
    this.saveImage(file).subscribe(url => this.photoURL = url);
  }

  saveImage(file: File): Observable<string> {
    // FIXME: generate unique identifiers for children
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child('/' + file.name).put(file);

    return Observable.create((obs) => {
      uploadTask.on('state_changed', function (snapshot) {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, function (err) {
        obs.error(err);
      }, function () {
        const downloadURL = uploadTask.snapshot.downloadURL;
        obs.next(downloadURL);
        obs.complete();
      });
    });
  }
}
