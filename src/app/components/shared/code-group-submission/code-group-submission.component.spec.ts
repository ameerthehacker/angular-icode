import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeGroupSubmissionComponent } from './code-group-submission.component';

describe('CodeGroupSubmissionComponent', () => {
  let component: CodeGroupSubmissionComponent;
  let fixture: ComponentFixture<CodeGroupSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeGroupSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeGroupSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
