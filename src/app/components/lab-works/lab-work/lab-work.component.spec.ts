import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabWorkComponent } from './lab-work.component';

describe('LabWorkComponent', () => {
  let component: LabWorkComponent;
  let fixture: ComponentFixture<LabWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
