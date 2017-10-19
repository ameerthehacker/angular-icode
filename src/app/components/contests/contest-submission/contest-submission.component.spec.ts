import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestSubmissionComponent } from './contest-submission.component';

describe('ContestSubmissionComponent', () => {
  let component: ContestSubmissionComponent;
  let fixture: ComponentFixture<ContestSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
