import { Component, Input, OnInit } from '@angular/core';
import { Badge } from '../badge';

@Component({
  selector: 'cowabunga-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {

  @Input()
  badges: Badge[];

  constructor() { }

  ngOnInit() {
  }

}
