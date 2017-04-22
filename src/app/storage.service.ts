import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class StorageService {

  constructor(private firebaseApp: FirebaseApp) {}

  saveImage(file: File): Observable<string> {
    // FIXME: generate uniqe identifiers for children
    alert(typeof firebase.storage());
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
