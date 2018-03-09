import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnscheduledFormComponent } from './unscheduled-form.component';

describe('UnscheduledFormComponent', () => {
  let component: UnscheduledFormComponent;
  let fixture: ComponentFixture<UnscheduledFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnscheduledFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnscheduledFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
