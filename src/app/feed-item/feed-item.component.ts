import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cowabunga-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss']
})
export class FeedItemComponent implements OnInit {

  @Input()
  checkIn;

  constructor() { }

  ngOnInit() {
  }

}
