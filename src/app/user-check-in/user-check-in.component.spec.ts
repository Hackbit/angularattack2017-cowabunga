import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCheckInComponent } from './user-check-in.component';

describe('UserCheckInComponent', () => {
  let component: UserCheckInComponent;
  let fixture: ComponentFixture<UserCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCheckInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
