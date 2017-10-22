import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabWorksFormComponent } from './lab-works-form.component';

describe('LabWorksFormComponent', () => {
  let component: LabWorksFormComponent;
  let fixture: ComponentFixture<LabWorksFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabWorksFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabWorksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
