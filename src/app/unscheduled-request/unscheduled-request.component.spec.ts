import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnscheduledRequestComponent } from './unscheduled-request.component';

describe('UnscheduledRequestComponent', () => {
  let component: UnscheduledRequestComponent;
  let fixture: ComponentFixture<UnscheduledRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnscheduledRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnscheduledRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
