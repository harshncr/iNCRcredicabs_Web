import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassUploadEmployeeComponent } from './mass-upload-employee.component';

describe('MassUploadEmployeeComponent', () => {
  let component: MassUploadEmployeeComponent;
  let fixture: ComponentFixture<MassUploadEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassUploadEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassUploadEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
