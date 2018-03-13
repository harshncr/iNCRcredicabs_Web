import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderAnimComponent } from './loader-anim.component';

describe('LoaderAnimComponent', () => {
  let component: LoaderAnimComponent;
  let fixture: ComponentFixture<LoaderAnimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderAnimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderAnimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
