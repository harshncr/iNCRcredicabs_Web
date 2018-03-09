import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPasswordEmployeeComponent } from './set-password-employee.component';

describe('SetPasswordEmployeeComponent', () => {
  let component: SetPasswordEmployeeComponent;
  let fixture: ComponentFixture<SetPasswordEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPasswordEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPasswordEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
