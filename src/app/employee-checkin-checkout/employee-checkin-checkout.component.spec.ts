import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCheckinCheckoutComponent } from './employee-checkin-checkout.component';

describe('EmployeeCheckinCheckoutComponent', () => {
  let component: EmployeeCheckinCheckoutComponent;
  let fixture: ComponentFixture<EmployeeCheckinCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCheckinCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCheckinCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
