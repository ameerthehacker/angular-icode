import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentSubmissionComponent } from './assignment-submission.component';

describe('AssignmentSubmissionComponent', () => {
  let component: AssignmentSubmissionComponent;
  let fixture: ComponentFixture<AssignmentSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
