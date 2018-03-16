import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeReqUnschComponent } from './employee-req-unsch.component';

describe('EmployeeReqUnschComponent', () => {
  let component: EmployeeReqUnschComponent;
  let fixture: ComponentFixture<EmployeeReqUnschComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeReqUnschComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeReqUnschComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
