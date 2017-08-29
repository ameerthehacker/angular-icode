import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesFormComponent } from './challenges-form.component';

describe('ChallengesFormComponent', () => {
  let component: ChallengesFormComponent;
  let fixture: ComponentFixture<ChallengesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
