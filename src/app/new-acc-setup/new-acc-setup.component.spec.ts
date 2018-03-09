import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccSetupComponent } from './new-acc-setup.component';

describe('NewAccSetupComponent', () => {
  let component: NewAccSetupComponent;
  let fixture: ComponentFixture<NewAccSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAccSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
