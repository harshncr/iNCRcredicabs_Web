import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterViewComponent } from './roster-view.component';

describe('RosterViewComponent', () => {
  let component: RosterViewComponent;
  let fixture: ComponentFixture<RosterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
