import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsListComponent } from './assignments-list.component';

describe('AssignmentsListComponent', () => {
  let component: AssignmentsListComponent;
  let fixture: ComponentFixture<AssignmentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
