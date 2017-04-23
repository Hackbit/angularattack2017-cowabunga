import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from '../user.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'cowabunga-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  @ViewChild(ModalDirective)
  private modal: ModalDirective;

  message;
  badgeSubscription;

  constructor(
    private database: AngularFireDatabase,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.badgeSubscription = this.userService.getUser()
      .map(user => user.$key)
      .map(key => {
        this.database.list(`/users/${key}/badges`).$ref
          .on('child_added', (child) => {
            this.message = JSON.stringify(child);
            this.modal.show();
          });
      }).subscribe();
  }

  ngOnDestroy() {
    this.badgeSubscription.unsubscribe();
  }

}
