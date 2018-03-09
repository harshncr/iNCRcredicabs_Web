import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledFormComponent } from './scheduled-form.component';

describe('ScheduledFormComponent', () => {
  let component: ScheduledFormComponent;
  let fixture: ComponentFixture<ScheduledFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
