import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StorageService {

  constructor() {
  }

  saveImage(file: File): Observable<string> {
    // FIXME: generate unique identifiers for children
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child('images/' + file.name).put(file);

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
