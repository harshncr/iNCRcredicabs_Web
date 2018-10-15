import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderAnimInlineComponent } from './loader-anim-inline.component';

describe('LoaderAnimComponent', () => {
  let component: LoaderAnimInlineComponent;
  let fixture: ComponentFixture<LoaderAnimInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderAnimInlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderAnimInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
