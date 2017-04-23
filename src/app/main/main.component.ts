///<reference path="../../../node_modules/angularfire2/database/firebase_list_observable.d.ts"/>
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserService } from '../user.service';
import { ModalDirective } from 'ngx-bootstrap';
import 'rxjs/add/operator/skip';

@Component({
  selector: 'cowabunga-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  @ViewChild(ModalDirective)
  private modal: ModalDirective;
  isModalShown;

  message;
  badgeSubscription;

  constructor(
    private database: AngularFireDatabase,
    private userService: UserService
  ) { }

  public showModal() {
    this.isModalShown = true;
  }

  public hideModal() {
    this.modal.hide();
  }

  public onHidden() {
    this.isModalShown = false;
  }

  ngOnInit() {
    this.badgeSubscription = this.userService.getUser()
      .map(user => user.$key)
      .map(key => {
        this.database.list(`/users/${key}/badges`)
          .$ref
          .orderByChild('timestamp')
          .startAt(Date.now())
          .on('child_added', (child) => {
            this.message = JSON.stringify(child.val());
            this.showModal();
          });
      }).subscribe();
  }

  ngOnDestroy() {
    this.badgeSubscription.unsubscribe();
  }

}
