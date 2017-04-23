import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cowabunga-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  checkIns: Observable<any[]>;

  constructor(private afDatabase: AngularFireDatabase) { }

  ngOnInit() {
    this.checkIns = this.afDatabase.list('checkInFeed')
      .map(checkIns => {
        const arr = [];
        Object.keys(checkIns).forEach(key => arr.push(checkIns[key]));
        return arr;
      });
  }

}
