import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverUpdateComponent } from './driver-update.component';

describe('DriverUpdateComponent', () => {
  let component: DriverUpdateComponent;
  let fixture: ComponentFixture<DriverUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
