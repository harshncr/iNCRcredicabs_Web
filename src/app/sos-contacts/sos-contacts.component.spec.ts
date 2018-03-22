import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SosContactsComponent } from './sos-contacts.component';

describe('SosContactsComponent', () => {
  let component: SosContactsComponent;
  let fixture: ComponentFixture<SosContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SosContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SosContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
