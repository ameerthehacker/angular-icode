import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabWorksListComponent } from './lab-works-list.component';

describe('LabWorksListComponent', () => {
  let component: LabWorksListComponent;
  let fixture: ComponentFixture<LabWorksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabWorksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabWorksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
