import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestsFormComponent } from './contests-form.component';

describe('ContestsFormComponent', () => {
  let component: ContestsFormComponent;
  let fixture: ComponentFixture<ContestsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
