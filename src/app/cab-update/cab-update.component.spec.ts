import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabUpdateComponent } from './cab-update.component';

describe('CabUpdateComponent', () => {
  let component: CabUpdateComponent;
  let fixture: ComponentFixture<CabUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
