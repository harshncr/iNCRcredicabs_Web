import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabListComponent } from './cab-list.component';

describe('CabListComponent', () => {
  let component: CabListComponent;
  let fixture: ComponentFixture<CabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
