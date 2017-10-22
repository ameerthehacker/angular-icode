import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabWorkSubmissionComponent } from './lab-work-submission.component';

describe('LabWorkSubmissionComponent', () => {
  let component: LabWorkSubmissionComponent;
  let fixture: ComponentFixture<LabWorkSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabWorkSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabWorkSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
