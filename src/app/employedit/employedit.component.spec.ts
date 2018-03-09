import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeditComponent } from './employedit.component';

describe('EmployeditComponent', () => {
  let component: EmployeditComponent;
  let fixture: ComponentFixture<EmployeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
