import { Component, Input, OnInit } from '@angular/core';
import { Badge } from '../badge';

@Component({
  selector: 'cowabunga-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

  @Input()
  badge: Badge;

  constructor() { }

  ngOnInit() {
  }

}
