import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderReportlistComponent } from './header-reportlist.component';

describe('HeaderReportlistComponent', () => {
  let component: HeaderReportlistComponent;
  let fixture: ComponentFixture<HeaderReportlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderReportlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderReportlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
