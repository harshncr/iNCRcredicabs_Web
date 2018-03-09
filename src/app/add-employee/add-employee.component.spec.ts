import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployee } from './add-employee.component';

describe('AddEmployee', () => {
  let component: AddEmployee;
  let fixture: ComponentFixture<AddEmployee>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployee ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
