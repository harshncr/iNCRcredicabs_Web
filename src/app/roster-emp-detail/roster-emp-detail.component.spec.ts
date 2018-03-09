import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterEmpDetailComponent } from './roster-emp-detail.component';

describe('RosterEmpDetailComponent', () => {
  let component: RosterEmpDetailComponent;
  let fixture: ComponentFixture<RosterEmpDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterEmpDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterEmpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
