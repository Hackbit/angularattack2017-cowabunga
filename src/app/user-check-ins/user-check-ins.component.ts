import { Component, Input, OnInit } from '@angular/core';
import { CheckIn } from '../check-in';

@Component({
  selector: 'cowabunga-user-check-ins',
  templateUrl: './user-check-ins.component.html',
  styleUrls: ['./user-check-ins.component.css']
})
export class UserCheckInsComponent implements OnInit {

  @Input()
  checkIns: CheckIn[];

  constructor() { }

  ngOnInit() { }

}
