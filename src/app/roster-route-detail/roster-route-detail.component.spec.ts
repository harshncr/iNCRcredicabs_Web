import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterRouteDetailComponent } from './roster-route-detail.component';

describe('RosterRouteDetailComponent', () => {
  let component: RosterRouteDetailComponent;
  let fixture: ComponentFixture<RosterRouteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterRouteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterRouteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
